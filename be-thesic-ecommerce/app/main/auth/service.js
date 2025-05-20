"use strict";

const Boom = require("@hapi/boom");
const _ = require("lodash");
const crypto = require("crypto");
const Models = require("../../db/models");
const jwt = require("../../services/jwt");
const PasswordUtils = require("../../services/password");
const MailUtils = require("../../emailService");
const config = require("../../config");
const axios = require('axios')
const passport = require("passport");
// const { OAuth2Client } = require('google-auth-library');
const mainWebUrl = config.webClient.url;

class AuthService {
  async login(payload) {
    try {
      const { email } = payload;
      const user = await Models.User.query()
        .findOne({
          email,
        })
        .joinRelation("role")
        .select([
          "users.*",
          "users.password as hashPassword",
          "role.nameRole as scope",
        ]);

      if (!user) {
        throw Boom.notFound("Tài khoản không tồn tại");
      } else if (!user.password)
        Boom.unauthorized("Tài khoản hoặc mật khẩu không chính xác");

      const isCorrectPassword = await PasswordUtils.compare(
        payload.password,
        user.hashPassword
      );
      if (!isCorrectPassword) {
        throw Boom.unauthorized("Tài khoản hoặc mật khẩu không chính xác");
      }

      const data = _.pick(user, ["email", "id", "scope"]);
      return _.assign(
        {
          token: jwt.issue(data),
        },
        data
      );
    } catch (err) {
      throw err;
    }
  }

  async loginByGoogle(token) {
    try {
      const GOOGLE_CLIENT_ID = "532996168508-gpclb9gma2oc0eseuv3vfqil8pkcrucl.apps.googleusercontent.com";
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
      );
      console.log("token----------------: ", token)
      const payload = response.data;

      if (payload.aud !== GOOGLE_CLIENT_ID) {
        throw new Error("Invalid client ID");
      }
      console.log("====================payload: ", payload)
      const { email, picture, name } = payload;

      const user = await Models.User.query()
        .findOne({
          email,
        })
        .joinRelation("role")
        .select([
          "users.*",
          "users.password as hashPassword",
          "role.nameRole as scope",
        ]);

      // Create user
      if (!user) {
        const memberRole = await Models.Role.query().findOne({
          nameRole: "user",
        });

        const dataToRegister = {
          name,
          email,
          roleId: memberRole.id,
          password: null,
          avatar: picture,
          isVerifyEmail: true,
        };

        let data = await Models.User.query()
          .insert(dataToRegister)
          .returning("*");
        data.scope = "user";
        data = _.pick(data, ["email", "id", "scope"]);
        return _.assign(
          {
            token: jwt.issue(data),
          },
          data
        );
      }

      const data = _.pick(user, ["email", "id", "scope"]);
      return _.assign(
        {
          token: jwt.issue(data),
        },
        data
      );
    } catch (error) {
      throw error;
    }
  }

  async loginAdmin(payload) {
    try {
      const { email } = payload;
      const user = await Models.User.query()
        .findOne({
          email,
        })
        .joinRelation("role")
        .select([
          "users.*",
          "users.password as hashPassword",
          "role.nameRole as scope",
        ]);
      if (!user) {
        throw Boom.notFound("This account is not exist");
      }
      const isCorrectPassword = await PasswordUtils.compare(
        payload.password,
        user.hashPassword
      );
      if (!isCorrectPassword) {
        throw Boom.unauthorized("Incorrect email or password");
      }
      if (
        user.scope === "superadmin" ||
        user.scope === "admin" ||
        user.scope === "staff"
      ) {
        const data = _.pick(user, ["email", "id", "scope"]);
        return await _.assign(
          {
            token: jwt.issue(data),
          },
          data
        );
      }
      throw Boom.unauthorized("The account is not authorized");
    } catch (err) {
      throw err;
    }
  }

  async register(payload) {
    try {
      const { email } = payload;
      const checkUserByEmail = await Models.User.query().findOne({
        email,
      });
      if (checkUserByEmail) {
        throw Boom.badRequest("Email is exist");
      }
      const hashPassword = await PasswordUtils.hash(payload.password);

      payload.password = hashPassword;
      const memberRole = await Models.Role.query().findOne({
        nameRole: "user",
      });
      payload.roleId = memberRole.id;

      let data = await Models.User.query().insert(payload).returning("*");
      data.scope = "user";
      data = _.pick(data, ["email", "id", "scope"]);
      return _.assign(
        {
          token: jwt.issue(data),
        },
        data
      );
    } catch (err) {
      throw err;
    }
  }

  async resetPassword(token, password) {
    const user = await Models.User.query()
      .where("resetPasswordToken", token)
      .where("resetPasswordExpire", ">", new Date().toISOString())
      .first();
    if (!user) {
      throw Boom.conflict("Your password token is incorrect ore expired");
    }
    const newHashPassword = await PasswordUtils.hash(newHashPassword);
    await Models.User.query().patchAndFetchById(user.id, {
      resetPasswordToken: null,
      resetPasswordExpire: null,
      password: newHashPassword,
    });
    return {
      message: "Your password has been reset",
    };
  }

  async forgotPassword(email) {
    const user = await Models.User.query().findOne({
      email,
    });
    if (!user) {
      throw Boom.conflict("Email không tồn tại");
    }
    const resetPasswordToken = crypto.randomBytes(64).toString("hex");
    await MailUtils.sendEmailResetPassword(
      user.email,
      `${mainWebUrl}/reset-password?token=${resetPasswordToken}`
    );
    const resetPasswordExpire = new Date();
    resetPasswordExpire.setDate(resetPasswordExpire.getDate() + 1);
    await Models.User.query().patchAndFetchById(user.id, {
      resetPasswordToken,
      resetPasswordExpire: resetPasswordExpire.toISOString(),
    });
    return {
      message: "Cập nhật mật khẩu của bạn đã được xác nhận và gửi qua email",
    };
  }
}

module.exports = AuthService;
