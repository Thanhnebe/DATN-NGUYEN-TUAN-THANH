"use strict";
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const passwordReset = path.join(__dirname, "emails", "template", "resetPassword.ejs");
const createOrderEmail = path.join(__dirname, "emails", "template", "createOrderEmail.ejs");
const confirmOrderEmail = path.join(__dirname, "emails", "template", "confirmOrderEmail.ejs");
const shippedEmail = path.join(__dirname, "emails", "template", "shippedEmail.ejs");
const completeOrderEmail = path.join(__dirname, "emails", "template", "completeOrderEmail.ejs");
const contactEmail = path.join(__dirname, "emails", "template", "contactEmail.ejs");

const Email = require("email-templates");
const moment = require("moment");
const Models = require("./../db/models");
const config = require("../config");

// Create a Nodemailer transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config?.sendgrid?.fromEmail || "httt2hauik15@gmail.com", 
    pass: config?.sendgrid?.secretKey || "lipv udjs xghr kedw" 
  }
});

const email = new Email({
  message: {
    from: config.sendgrid.fromEmail || "httt2hauik15@gmail.com",
  },
  transport: transporter,
  views: {
    options: {
      extension: "ejs",
    },
  },
});

async function sendEmailResetPassword(receiverEmail, resetPasswordUrl) {
  try {
    const content = await email.render(passwordReset, {
      name: "Stone Shop",
      token: resetPasswordUrl,
      timeToken: 24,
    });
    const mailOptions = {
      from: config?.sendgrid?.fromEmail || "httt2hauik15@gmail.com",
      to: receiverEmail,
      subject: "Stone Shop! Yêu cầu cập nhật mật khẩu",
      html: content,
    };
    const test = await transporter.sendMail(mailOptions);
  } catch (err) {
    return err;
  }
}

async function sendEmailContactEmail(receiverEmail) {
  try {
    const content = await email.render(contactEmail, {
      name: receiverEmail,
    });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: receiverEmail,
      subject: "Stone Shop! Re: liên hệ của bạn",
      html: content,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    return err;
  }
}

async function sendEmailCreateOrderEmail(receiverEmail) {
  try {
    const content = await email.render(createOrderEmail, {
      name: receiverEmail,
    });
    const mailOptions = {
      from: config?.sendgrid?.fromEmail || "httt2hauik15@gmail.com",
      to: receiverEmail,
      subject: "Stone Shop! Đơn hàng của bạn đã được tạo",
      html: content,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    return err;
  }
}

async function sendEmailShippedOrder(id) {
  const order = await Models.Order.query().findById(id);
  if (!order) {
    return { message: "Đơn hàng không tồn tại" };
  }
  const user = await Models.User.query().findById(order.userId);
  if (!user) {
    return { message: "Người dùng không tồn tại" };
  }
  try {
    const content = await email.render(shippedEmail, {
      name: order.fullName,
    });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: user.email,
      subject: "Stone Shop! Đơn hàng của bạn đang được giao",
      html: content,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    return err;
  }
}

async function sendEmailConfirmOrderEmail(id) {
  const order = await Models.Order.query().findById(id).withGraphFetched("orderDetails");
  if (!order) {
    return { message: "Đơn hàng không tồn tại" };
  }
  const user = await Models.User.query().findById(order.userId);
  if (!user) {
    return { message: "Người dùng không tồn tại" };
  }
  const formatDay = moment(order.createdAt).format("DD/MM/YYYY H:mm a");
  try {
    const content = await email.render(confirmOrderEmail, {
      name: order.fullName,
      order,
      date: formatDay,
    });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: user.email,
      subject: "Stone Shop! Đơn hàng của bạn đã được xác thực",
      html: content,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    return err;
  }
}

async function sendEmailCompleteOrderEmail(id) {
  const order = await Models.Order.query().findById(id);
  if (!order) {
    return { message: "Đơn hàng không tồn tại" };
  }
  const user = await Models.User.query().findById(order.userId);
  if (!user) {
    return { message: "Người dùng không tồn tại" };
  }
  try {
    const content = await email.render(completeOrderEmail, {
      name: order.fullName,
    });
    const mailOptions = {
      from: config.sendgrid.fromEmail,
      to: user.email,
      subject: "Stone Shop! Đơn hàng của bạn đã hoàn thành",
      html: content,
    };
    await transporter.sendMail(mailOptions);
  } catch (err) {
    return err;
  }
}

module.exports.sendEmailResetPassword = sendEmailResetPassword;
module.exports.sendEmailCreateOrderEmail = sendEmailCreateOrderEmail;
module.exports.sendEmailConfirmOrderEmail = sendEmailConfirmOrderEmail;
module.exports.sendEmailShippedOrder = sendEmailShippedOrder;
module.exports.sendEmailCompleteOrderEmail = sendEmailCompleteOrderEmail;
module.exports.sendEmailContactEmail = sendEmailContactEmail;
