const Boom = require("boom");
const Joi = require("@hapi/joi");
const { jwtConfig } = require("../../config");
const jwt = require("jsonwebtoken");
const jwtGenerator = async (userId) => {
  const token =await jwt.sign({ user_id: userId,deviceType:'1',deviceToken:"" }, jwtConfig);
  return token;
};
const jwtAppTokenGenerator = async (userId,deviceType,deviceToken) => {
  const token =await jwt.sign({ user_id: userId,deviceType,deviceToken }, jwtConfig);
  return token;
};
module.exports = {
  jwtGenerator,
  jwtAppTokenGenerator
};