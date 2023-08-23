const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
      minLength: [6, "Password must be up to 6 characters"],
      //maxLength: [23, "Password must not more than 23 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
    phone: {
      type: String,
      default: "+123",
    },
    bio: {
      type: String,
      maxLength: [250, "Bio must not more than 250 characters"],
      default: "Bio",
    },
  },
  {
    timestamps: true,
  }
);

//Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
