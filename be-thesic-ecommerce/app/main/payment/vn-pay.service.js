const querystring = require("qs");
const crypto = require("crypto");
const moment = require("moment");
const Models = require("../../db/models");
const Excel = require('exceljs'); 
const { capitalize } = require('../../utils/string');
const config = require("../../config");

const vnPayStatus = {
  "00": "Giao dịch thành công",
  "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
  "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
  10: "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
  11: "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
  12: "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
  13: "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.",
  24: "Giao dịch không thành công do: Khách hàng hủy giao dịch",
  51: "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
  65: "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
  75: "Ngân hàng thanh toán đang bảo trì.",
  79: "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
  99: "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
};

const tmnCode = "LE4KL6TI";
const secretKey = "H5DB6TM9P6N9IOJZV8NP76C1DVL95X66";
const vnpUrl = config?.vnPay?.url || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const returnUrl = config?.vnPay?.returnUrl || "https://stoneshop.online/payment-status" 

function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
  });
  return sorted;
}

class VNPayService {
  async getMany(query) {
    const builder = Models.Transaction.queryBuilder(query)
    // if (this.getSearchQuery && query.q) {
    //   this.getSearchQuery(builder, query.q);
    // }
    if (query.q) {
      builder.where((qb) => {
        qb.where('transactionCode', 'like', `%${query.q}%`)
          .orWhere('orderId', 'like', `%${query.q}%`);
      });
    }
    await builder.orderBy('createdAt', 'desc');
    return builder;
  }

  async addVNPayTransaction(request) {
    const payload = request.payload;
    // bankCode: mã ngân hàng
    const { amount, orderDescription, orderId, orderType, language } = payload;

    const ipAddr =
      //   request.headers["x-forwarded-for"] ||
      request?.infor?.remoteAddress || request?.info?.address || "127.0.0.1";
    //   request.socket.remoteAddress ||
    //   request.connection.socket.remoteAddress;

    const createDate = moment().utcOffset("+07:00").format("YYYYMMDDHHmmss");

    const orderInfo = `Mã đơn hàng: ${orderId} Mô tả: ${orderDescription}`;
    const locale = language || "vn";
    const currCode = "VND";

    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
      // ...(bankCode && { vnp_BankCode: bankCode }),
    };
    const sortedParams = sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    sortedParams["vnp_SecureHash"] = signed;

    const finalUrl =
      vnpUrl + "?" + querystring.stringify(sortedParams, { encode: false });
    return finalUrl;
  }

  async checkVNPayPayment(payload) {
    const vnp_Params = { ...payload };
    const secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    const sortedParams = sortObject(vnp_Params);
    const signData = querystring.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    // Kiểm tra tmnCode
    if (vnp_Params["vnp_TmnCode"] !== tmnCode) {
      return { success: false, code: "Thanh toan that bai" };
    }

    if (secureHash == signed) {
   
      const responseCode = vnp_Params["vnp_ResponseCode"];
      const code = vnPayStatus[responseCode] || "Unknown Error";

      const orderId = vnp_Params.vnp_TxnRef;
      const transactionID = vnp_Params.vnp_TransactionNo;
      const paymentDate = vnp_Params.vnp_PayDate;
      const amount = parseInt(vnp_Params.vnp_Amount, 10); // Assuming vnp_Amount is in cents
    
      // Insert the transaction record
      await Models.Transaction.query().insert({
          orderId,
          transactionCode: transactionID,
          amount: amount / 100, 
          status: responseCode,
          paymentDate: paymentDate,
          type: 'VNPAY'
      });
      if (responseCode == "00") {
        const [order, orderDetails] = await Promise.all([
          Models.Order.query()
            .where("id", orderId)
            .andWhere("isPaid", false)
            .patch({
              isPaymentOnline: true,
              isPaid: true,
              status: "Confirm",
            }),
          Models.OrderDetail.query().where("orderId", orderId),
        ]);

        const productOrder = await Promise.all(
          orderDetails.map((order) => order.productId)
        );
        const dataRes = {
          orderId,
          products: productOrder,
        };
        return { success: true, message: vnPayStatus[code], dataRes };
      }
      return { success: false, message: vnPayStatus[code] };
    } else {
      const responseCode = vnp_Params["vnp_ResponseCode"];
      const code = vnPayStatus[responseCode] || "Unknown Error";
      return { success: false, code: "Thanh toan that bai" };
    }
  }

  getExportExecelQuery(query) {
    return Models.Transaction.queryBuilder(query);
  }

  async exportExcel(query, h) {
    try {
      query = query || {}
      delete query.limit;
      delete query.offset;
      const data = await this.getExportExecelQuery(query);
      const options = {
        useStyles: true
      };
      const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
      const sheet = workbook.addWorksheet('Transaction');
      const columns = Object.keys(data[0]).map((e) => {
        return {
          header: capitalize(e),
          key: e,
          width: 35
        };
      });
      sheet.columns = columns;
      sheet.getRow(1).font = {
        color: { argb: 'FFFFFFFF' },
        bold: true
      };
      sheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '337ab7' }
      };

      for (const e of data) {
        sheet.addRow(e);
      }
      await workbook.commit();
      const stream = workbook.stream;
      const b = stream.read();
      return h
        .response(b)
        .type(
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        .header('Content-Disposition', `attachment; filename=${'Transaction'}_${moment().format('DDMMYYYYHHMM')}.xlsx`)
        .header('Access-Control-Expose-Headers', 'Content-Disposition')
        .header('Content-Length', stream.length);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = VNPayService;
