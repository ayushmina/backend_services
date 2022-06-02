const Mongoose = require("mongoose");
const appConstants=require("../utils/appConstants")
const Schema = Mongoose.Schema;
const userDataSchema = new Schema(
    {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    countryCode: {
      type: String,
    },
    email: {
      type: String,
    },
    
    profilePic: {
      type: String,
    },
    firebaseUID: {
      type: String,
    },
    loginType: {
      type: String,
      enum: [appConstants.firebaseLogin,appConstants.googleLoginIn,appConstants.githubLogIn,appConstants.facebookLogin,appConstants.instagramLogin,appConstants.twitterLogin],
    },
    googleInfo: {
     
      googleId: {
        type: String
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      profilePic: {
        type: String
      },
      email:{
        type: String
      }
    },
    facebookInfo: {
     
      facebookId: {
        type: String
      },
      access_token:{
        type: String  
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      profilePic: {
        type: String
      },
      email:{
        type: String
      },
      phoneNumber:{
        type: String
      }
    },
    instagramInfo: {
     
      instagramId: {
        type: String
      },
      access_token:{
        type: String  
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      profilePic: {
        type: String
      },
      email:{
        type: String
      },

    },
    githubInfo: {
     
      githubId: {
        type: String
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      profilePic: {
        type: String
      },
    
    },
    twitterInfo: {
     
      twitterId: {
        type: String
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      profilePic: {
        type: String
      },
      email:{
        type: String
      },
    },
    deviceToken: {
      type: String,
    },
    deviceType:{
      type: String,
      enum:[appConstants.deviceType_android,appConstants.deviceType_apple,appConstants.deviceType_website]
    }
  },
  { timestamps: true }
);

module.exports = Mongoose.model("userData",userDataSchema);
