const axios = require("axios");
const { response } = require("express");
const config = require("../../config");
const models = require("../models")
const appConstants = require("../utils/appConstants")
const responseMessages=require("../resources/resources.json")
const  universalFunctions =require("../utils/unversalFunction");
const Joi=require("joi");
const {jwtGeneratorApp}=require("../utils/JwtFunctions");
exports.googleLogInSignUp = async (req, res) => {
    try {
        const schema = Joi.object().keys({
            googleJson: Joi.object().required(),
            firebaseUID: Joi.string().required(),
            loginType:Joi.string().required(),
            email:Joi.string().required(),
            FirstName:Joi.string().required(),
            lastName:Joi.string().required(),
            profilePic:Joi.string().allow(""),
            deviceType: Joi.string(),
            deviceToken: Joi.string().allow(""),
          });
          await universalFunctions.validateRequestPayload(req.body, res, schema);
          let userData=await models.userSchema.create(req.body);
          let token =jwtGeneratorApp(userData._id,req.body.deviceType,req.body.deviceToken);
          universalFunctions.sendSuccess(
            {
              statusCode: 200,
              message: responseMessages.SUCCESS,
              data: { token, userData },
            },
            res
          );

    }
    catch (error)
    {
      return universalFunctions.sendError(error, res)
    }
}

