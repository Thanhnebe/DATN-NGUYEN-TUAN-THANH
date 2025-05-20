"use strict";

const { badRequest } = require("@hapi/boom");
const Models = require("../../db/models");
const moment = require("moment");

exports.countDashboard = async (query) => {
  const { startTime, endTime } = query;
  let countCustomer = Models.User.query().count();
  let countOrder = Models.Order.query();
  let sumRevenue = Models.Order.query()
    .sum("totalAmount as total")
    .where("isPaid", true);
  if (startTime && endTime) {
    countCustomer.whereBetween("createdAt", [startTime, endTime]);
    countOrder.whereBetween("createdAt", [startTime, endTime]);
    sumRevenue.whereBetween("createdAt", [startTime, endTime]);
  }
  const countProduct = Models.Product.query().count();
  let [customer, order, revenue, product] = await Promise.all([
    countCustomer,
    countOrder,
    sumRevenue,
    countProduct,
  ]);

  const result = {
    customerCount: customer[0].count ? customer[0].count : 0,
    orderCount: order[0].count ? order[0].count : 0,
    income: revenue[0].total ? revenue[0].total : 0,
    productCount: product[0].count ? product[0].count : 0,
  };
  return result;
};

exports.monthlyRevenueByYear = async (query) => {
  // Lấy ngày bắt đầu và kết thúc từ query
  const { startDate, endDate } = query;
  
  if (!startDate || !endDate) {
    throw new badRequest(
      "Vui lòng cung cấp đầy đủ ngày bắt đầu và ngày kết thúc"
    );
  }

  const start = moment(startDate).utcOffset(420).startOf("day");
  const end = moment(endDate).utcOffset(420).endOf("day");

  // Kiểm tra tính hợp lệ của ngày
  if (!start.isValid() || !end.isValid()) {
    throw new Error("Ngày bắt đầu hoặc ngày kết thúc không hợp lệ");
  }

  // Tính toán doanh thu trong khoảng thời gian từ startDate đến endDate
  const [revenue, cost, promo, totalOrder] = await Promise.all([
    Models.Order.query()
      .sum("totalAmount as total")
      .where('isPaid', true)
      .whereBetween("createdAt", [start.toDate(), end.toDate()]),
    Models.Order.query()
      .sum("cost")
      .where('isPaid', true)
      .whereBetween("createdAt", [start.toDate(), end.toDate()]),
    Models.Order.query()
      .sum("promoTotal")
      .where('isPaid', true)
      .whereBetween("createdAt", [start.toDate(), end.toDate()]),
    Models.Order.query().whereBetween("createdAt", [start.toDate(), end.toDate()]).count(),
  ]);

  const revenueTotal = revenue[0].total || 0;
  const costTotal = cost[0]?.sum || 0;
  const promoTotal = promo[0]?.sum || 0;
  const profitTotal = revenueTotal - costTotal - promoTotal;

  return {
    startDate: start.format("YYYY-MM-DD HH:mm:ss"),
    endDate: end.format("YYYY-MM-DD HH:mm:ss"),
    revenue: revenueTotal,
    cost: costTotal + promoTotal,
    profit: profitTotal,
    totalOrder: totalOrder[0]?.count || 0,
  };
};

// - tuần này, tuần trước, tháng này, tháng trước, quý 1,2,3,4, năm trước, năm nay.
exports.statisticProduct = async (time = "year", type, limit) => {
  if (!limit) limit = 5;
  let startDate, endDate;

  switch (time) {
    case "today":
      startDate = moment().startOf("day").toDate();
      endDate = moment().endOf("day").toDate();
      break;
    case "thisWeek":
      startDate = moment().startOf("isoWeek").toDate();
      endDate = moment().endOf("isoWeek").toDate();
      break;
    case "lastWeek":
      startDate = moment().subtract(1, "weeks").startOf("isoWeek").toDate();
      endDate = moment().subtract(1, "weeks").endOf("isoWeek").toDate();
      break;
    case "thisMonth":
      startDate = moment().startOf("month").toDate();
      endDate = moment().endOf("month").toDate();
      break;
    case "lastMonth":
      startDate = moment().subtract(1, "months").startOf("month").toDate();
      endDate = moment().subtract(1, "months").endOf("month").toDate();
      break;
    case "q1":
      startDate = moment().startOf("year").toDate();
      endDate = moment()
        .startOf("year")
        .add(2, "months")
        .endOf("month")
        .toDate();
      break;
    case "q2":
      startDate = moment()
        .startOf("year")
        .add(3, "months")
        .startOf("month")
        .toDate();
      endDate = moment()
        .startOf("year")
        .add(5, "months")
        .endOf("month")
        .toDate();
      break;
    case "q3":
      startDate = moment()
        .startOf("year")
        .add(6, "months")
        .startOf("month")
        .toDate();
      endDate = moment()
        .startOf("year")
        .add(8, "months")
        .endOf("month")
        .toDate();
      break;
    case "q4":
      startDate = moment()
        .startOf("year")
        .add(9, "months")
        .startOf("month")
        .toDate();
      endDate = moment().endOf("year").toDate();
      break;
    case "lastYear":
      startDate = moment().subtract(1, "years").startOf("year").toDate();
      endDate = moment().subtract(1, "years").endOf("year").toDate();
      break;
    case "thisYear":
    default:
      startDate = moment().startOf("year").toDate();
      endDate = moment().endOf("year").toDate();
      break;
  }

  let result;

  switch (type) {
    case "topSelling":
      result = await Models.OrderDetail.query()
      .select("orderDetail.productId")
      .sum("orderDetail.quantity as totalSold") 
      .join("order", "orderDetail.orderId", "order.id")
      .join("product", "orderDetail.productId", "product.id")
      .whereBetween("order.createdAt", [startDate, endDate])
      .groupBy("orderDetail.productId", "product.nameProduct", "product.image")
      .orderBy("totalSold", "desc")
      .limit(limit)
      .select("product.nameProduct", "product.image");
      break;

    case "topNotSelling":
      result = await Models.Product.query()
      .select("product.id as productId")
      .count("orderDetail.id as totalOrders")
      .leftJoin("orderDetail", "product.id", "orderDetail.productId")
      .leftJoin("order", "orderDetail.orderId", "order.id")
      .whereBetween("order.createdAt", [startDate, endDate])
      .groupBy("product.id")
      .orderBy("totalOrders", "asc") // Sắp xếp theo số lượng đơn hàng (ít nhất trước)
      .orderBy("product.numberAvailable", "desc") // Sắp xếp theo số lượng tồn kho giảm dần
      .having("product.numberAvailable", ">", 0) // Chỉ sản phẩm còn hàng
      .limit(limit)
      .select(
        "product.nameProduct",
        "product.image",
        "product.numberAvailable"
      );
    break;

    case "topRated":
      result = await Models.Rating.query()
        .where("point", ">=", 4)
        .limit(limit)
        .select("productId", "point");
      break;

    case "lowRated":
      result = await Models.Rating.query()
        .where("point", "<", 3)
        .limit(limit)
        .select("productId", "point");
      break;

    default:
      result = [];
      break;
  }

  return { products: result };
};
