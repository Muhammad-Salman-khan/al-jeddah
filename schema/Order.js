import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  allProducts: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      productName: String,
      productPriceAtOrder: Number,
    },
  ],
  address: {
    type: String,
    required: [true, "Order is required"],
  },
  phoneNumber: String,
  email: String,
  CNIC: { type: String, default: "" },
  paymentMethod: String,
  deliveryFee: Number,
  totalItems: Number,
  totalPrice: Number,
  customerNote: String,
  cancelReason: String,
  status: {
    type: String,
    enum: ["pending", "confirm", "preparation", "outOfdelivery", "delivered"],
    default: "pending",
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
  },
});
const Order = mongoose.model.Order || mongoose.models("Order", orderSchema);
export default Order;
