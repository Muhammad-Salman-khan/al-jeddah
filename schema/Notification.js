import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    sendBy: String,
    title: String,
    message: String,
    type: { type: String, enum: ["order", "promotion", "system", "payment"] },
    link: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    forAdmin: Boolean,
  },
  { timestamps: true },
);

const Notification =
  mongoose.model.Notification ||
  mongoose.models("Notification", notificationSchema);
export default Notification;
