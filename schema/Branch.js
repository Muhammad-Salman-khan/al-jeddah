import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  branchName: {
    type: String,
  },
  location: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});

const Branch = mongoose.model.Branch || mongoose.models("Branch", branchSchema);
export default Branch;
