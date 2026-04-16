import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    productImage: {
      type: String,
      required: [true, "image Url is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
      maxLength: [4000, "description cannot exceed 4000 characters"],
    },
    price: {
      type: Number,
      min: 0,
      required: [true, "price is required"],
    },
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    isDeal: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Product =
  mongoose.model.Product || mongoose.models("Product", ProductSchema);

export default Product;
