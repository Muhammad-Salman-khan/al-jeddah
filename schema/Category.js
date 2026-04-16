import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name  is required"],
    },
    Image: {
      type: String,
      default: "",
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);

const Category =
  mongoose.model.Category || mongoose.models("Category", CategorySchema);

export default Category;
