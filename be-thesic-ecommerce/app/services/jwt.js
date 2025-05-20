'use strict';

const jsonwebtoken = require('jsonwebtoken');
const config = require('../config')
const _ = require('lodash');

class Jwt {
  constructor() {
    this.secret = config.jwt.secretKey;
    this.ttl = 30 * 24 * 60 * 60 * 1000; 
  }

  issue(payload, jwtOptions = {}) {
    return jsonwebtoken.sign(
      _.assign(payload, {
        ttl: this.ttl
      }),
      this.secret
    );
  }

  verify(token) {
    try {
      const decoded = jsonwebtoken.verify(token, this.secret);
      return { decoded };
    } catch (err) {
      return { valid: false, error: err }; 
    }
  }
}

module.exports = new Jwt();
