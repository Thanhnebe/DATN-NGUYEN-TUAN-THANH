"use strict";

const Boom = require("@hapi/boom");
const Models = require("../../db/models");
const BaseServiceCRUD = require("../../base/BaseServiceCRUD");
const MailUtils = require("../../emailService");
const { flatMap, compact } = require("lodash");
const { test } = require("./test");
const VNPayService = require("../payment/vn-pay.service");
class OrderService extends BaseServiceCRUD {
  constructor() {
    super(Models.Order, "Order");
  }

  async checkout(payload) {
    const { products } = payload;
    const ids = compact(flatMap(products, "productId"));
    const productInfos = await Models.Product.query()
      .select("id", "nameProduct", "image", "price")
      .whereIn("id", ids);

    if (!Array.isArray(ids) || ids?.length !== products?.length)
      throw "Sản phẩm không tồn tại";

    let itemAmount = 0;
    const newProducts = productInfos.map((product) => {
      const productDto = products.find(
        (productDto) => productDto.productId === product.id
      );
      const amount = productDto.quantity * product.price;
      itemAmount += amount;
      return { ...product, quantity: productDto.quantity, amount };
    });

    const shippingTotal = 20000;
    let promoTotal = 0;
    let usablePoints = 0;
    let receivedPoint = 0;
    let receiOrderPoint = 0;
    if (payload?.userId) {
      const user = await Models.User.query()
        .select("cumulativePoints")
        .where("id", payload.userId)
        .first();

      if (user.cumulativePoints >= 30) {
        // Tính số điểm tối đa có thể sử dụng
        const maxUsablePoints = Math.floor((itemAmount * 0.4) / 1000) * 5; // 20% giá trị đơn hàng quy đổi thành điểm
        usablePoints = Math.min(user.cumulativePoints, maxUsablePoints);

        // Quy đổi điểm thành VNĐ (5 điểm = 1,000 VNĐ)
        promoTotal = Math.floor(usablePoints / 5) * 1000;
      }
      receiOrderPoint = Math.max(Math.floor(itemAmount / 10000), 0);

      receivedPoint =
        user.cumulativePoints - usablePoints + receiOrderPoint >= 0
          ? user.cumulativePoints - usablePoints + receiOrderPoint
          : 0;
    }

    const totalAmount = Math.floor(itemAmount + shippingTotal - promoTotal);

    return {
      // ...info,
      totalAmount,
      itemAmount,
      promoTotal,
      shippingTotal,
      receivedPoint,
      // products: newProducts,
    };
  }

  async createOne(payload, request) {
    const { products, ...orderData } = payload;

    // Check user
    const user = await Models.User.query().findById(orderData.userId);
    if (!user) throw Boom.notFound("Khách hàng không tồn tại");

    let cost = 0;
    // Check ton kho
    for (const product of products) {
      const productInventory = await Models.Product.query().findOne({
        id: product.productId,
      });
      cost += productInventory?.cost * product?.quantity;
      if (
        productInventory.numberAvailable < product?.quantity
        //  ||
        // productInventory.stockQuantity < product?.quantity
      )
        throw Boom.badRequest("Sản phẩm hết hàng");
    }

    const trx = await Models.knex.transaction();
    try {
      const checkoutData = await this.checkout(payload);
      const receivedPoint = checkoutData.receivedPoint;
      delete checkoutData.products;
      delete checkoutData.receivedPoint;

      // Create order
      const [result, userUpdated] = await Promise.all([
        this.model
          .query(trx)
          .insert({ ...checkoutData, ...orderData, cost })
          .returning("*"),

        Models.User.query().where("id", orderData.userId).patch({
          cumulativePoints: receivedPoint,
        }),
      ]);

      if (!result) {
        // Create order
        await Models.Notification.query(trx)
          .insert({
            userId: orderData.userId,
            title: "Đặt hàng",
            description: `Bạn vừa tạo đơn hàng thất bạn`,
          })
          .returning("*");
        throw Boom.badRequest("Error");
      }

      // Create notification
      await Models.Notification.query(trx)
        .insert({
          userId: orderData.userId,
          title: "Đặt hàng",
          description: `Bạn vừa tạo đơn hàng <${result.id}> thành công`,
        })
        .returning("*");

      const newProducts = await Promise.all(
        products.map(async (product) => {
          const productDB = await Models.Product.query()
            .where({
              id: product.productId,
            })
            .first();

          return {
            orderId: result.id,
            nameProduct: productDB.nameProduct,
            imageProduct: productDB.imageProduct,
            price: productDB.price,
            ...product,
          };
        })
      );

      // Create order details
      const detailOrders = await Models.OrderDetail.query(trx)
        .insert(newProducts)
        .returning("*");

      // Update product inventory and create inventory logs
      products.map(async (product) => {
        const productInventory = await Models.Product.query()
          .decrement("numberAvailable", product.quantity)
          .where({
            id: product.productId,
          })
          .returning("*");

        await Models.Product.query()
          .decrement("stockQuantity", product.quantity)
          .where({
            id: product.productId,
          })
          .returning("*");

        await Models.InventoryLogs.query().insert({
          productID: product.productId,
          userID: orderData.userId,
          orderID: result.id,
          oldQuantity:
            (productInventory?.[0]?.stockQuantity || 0) + product.quantity,
          newQuantity: productInventory?.[0]?.stockQuantity || 0,
          price: productInventory?.[0]?.price || 0,
          description: "Đặt hàng",
        });
      });

      await trx.commit();

      // return vnpay url
      let vnPayUrl = "";
      const vnPayService = new VNPayService();
      if (payload.paymentMethod === "VNPAY") {
        const payloadVNPay = {
          ...request,
          payload: {
            amount: checkoutData?.totalAmount || 0,
            orderId: result.id,
            orderDescription: "Thanh toán đơn hàng qua VNPay",
            language: "vn",
            orderType: "other",
          },
        };

        vnPayUrl = await vnPayService.addVNPayTransaction(payloadVNPay);
      }
      // Send email
      // MailUtils.sendEmailCreateOrderEmail(user.email);

      return { ...result, products: detailOrders, vnPayUrl };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async getMany(query) {
    const builder = this.model
      .queryBuilder(query)
      .withGraphFetched("orderDetails");
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async getOne(id) {
    const result = await this.model
      .query()
      .findById(id)
      .withGraphFetched("orderDetails");
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async updateOne(id, payload) {
    const result = await this.model.query().patchAndFetchById(id, payload);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    if (payload.status === "Confirm") {
      await Models.Notification.query()
        .insert({
          userId: result.userId,
          title: "Đơn hàng",
          description: `Đơn hàng <${result.id}> của bạn đã được xác nhận`,
        })
        .returning("*");
      // MailUtils.sendEmailConfirmOrderEmail(id);
    }
    if (payload.status === "Shipping") {
      await Models.Notification.query()
        .insert({
          userId: result.userId,
          title: "Đơn hàng",
          description: `Đơn hàng <${result.id}> của bạn đang trong quá trình vận chuyển`,
        })
        .returning("*");
      // MailUtils.sendEmailShippedOrder(id);
    }
    if (payload.status === "Complete") {
      await Models.Notification.query()
        .insert({
          userId: result.userId,
          title: "Đơn hàng",
          description: `Đơn hàng <${result.id}> của bạn đã được giao thành công`,
        })
        .returning("*");
      // MailUtils.sendEmailCompleteOrderEmail(id);
    }
    return result;
  }

  getSearchQuery(builder, q) {
    builder.andWhere(function () {
      this.whereRaw("LOWER(\"fullName\") LIKE '%' || LOWER(?) || '%' ", q);
    });
  }
}

module.exports = OrderService;
