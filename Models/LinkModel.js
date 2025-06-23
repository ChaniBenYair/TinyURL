import mongoose from "mongoose";

const LinkSchema = mongoose.Schema({
  originalUrl: String,
  clicks: [{
    insertedAt: { type: Date, default: Date.now },
    ipAddress: { type: String, required: true },
    // targetParamValue: String 
  }],
});

export default mongoose.model("link", LinkSchema);
