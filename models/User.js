const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  credits: { type: Number, default: 0 }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
