const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  responded: { type: Boolean, default: false }
});

module.exports = RecipientSchema;
