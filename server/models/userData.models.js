const Mongoose = require("mongoose");
const appConstants=require("../utils/appConstants")
const Schema = Mongoose.Schema;
const userDataSchema = new Schema(
    {
    userId: {
      type:Number,
    },
    FirstName: {
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
    googleJson: {
      type: Object,
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
    facebookJson: {
      type: Object,
      facebookId: {
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
    instagramJson: {
      type: Object,
      instagramId: {
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
    githubJson: {
      type: Object,
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
    twitterJson: {
      type: Object,
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
