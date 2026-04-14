import mongoose from "mongoose";

const CreateUser = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profileImg: {
      type: String,
      default: "",
    },
    address: {
      type: [
        new mongoose.Schema({
          street: String,
          city: String,
          zipCode: Number,
        }),
      ],
      default: [],
    },
    phoneNumber: {
      type: [String],
      required: false,
      default: [],
    },
    CNICNumber: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "female"],
      default: [""],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Customer", "Staff", "Manager", "Admin"],
      default: "Customer",
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", CreateUser);
export default User;
