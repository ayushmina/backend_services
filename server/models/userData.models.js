const Mongoose = require("mongoose");
const appConstants=require("../utils/appConstants")
const Schema = Mongoose.Schema;
const userDataSchema = new Schema(
    {
    userId: {
      type:Number,
    },
      userName: {
      type: String,
    },
    email: {
      type: String,
    },
    
    profilePic: {
      type: String,
    },
    loginType: {
      type: String,
      enum: [appConstants.googleLoginIn],
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model("userData",userDataSchema);
