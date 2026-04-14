import mongoose from "mongoose ";

const cartSchem = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  allProducts: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      productAtAddTime: {
        name: String,
        price: {
          type: Number,
          min: 0,
        },
      },
    },
  ],
  totalPrice: Number,
  totalItems: Number,
  status: {
    type: String,
    enum: ["active", "abandoned", "converted"],
    default: "active",
  },
});

const Cart = mongoose.model.Cart | mongoose.models("Cart", cartSchem);

export default Cart;
