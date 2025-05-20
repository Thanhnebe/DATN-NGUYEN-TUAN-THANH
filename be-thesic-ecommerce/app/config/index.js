require("dotenv").config();

const config = {
  database: {
    connection: process.env.DATABASE_URL,
  },
  api: {
    host: process.env.APP_HOST,
    port: process.env.PORT,
  },
  jwt: {
    secretKey: process.env.JWT_SECRET,
  },
  sendgrid: {
    secretKey: process.env.SENDGRID_API_KEY,
    fromEmail: process.env.SENDGRID_EMAIL_FROM,
  },
  webClient: {
    url: process.env.WEB_CLIENT_URL,
  },
  redis: {
    url: process.env.REDIS_URL
  },
  vnPay: {
    url: process.env.VNPAY_URL,
    returnUrl: process.env.RETURN_VNPAY_URL
  }
};

module.exports = config;
