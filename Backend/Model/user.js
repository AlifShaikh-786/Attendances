import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // googleId: {
    //   type: String,
    // },
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
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
