import mongoose from "mongoose";
// import LinkModel from "./LinkModel.js";

const UserSchema = mongoose.Schema({
  name: String,
  email:String,
  password:String,
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
});

export default mongoose.model("User", UserSchema);
