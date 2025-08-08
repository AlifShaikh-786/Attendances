const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  f_name: {
    type: String,
    default: "",
  },
});

const UserModel = mongoose.model("admin", UserSchema);
module.exports = UserModel;
