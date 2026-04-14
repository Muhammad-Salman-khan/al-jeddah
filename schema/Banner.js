import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema({
  bannerImgs: [
    {
      type: String, // URL from Cloudinary
      validate: {
        validator: (arr) => arr.length <= 3,
        message: "Max 3 banners allowed",
      },
    },
  ],
});

const Slider = mongoose.model.Slider || mongoose.models("Slider", sliderSchema);
export default Slider;
