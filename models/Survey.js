const mongoose = require("mongoose");

const RecipientSchema = require("./Recipient");

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dateSent: Date,
  lastResponded: Date
});

const Survey = mongoose.model("Survey", SurveySchema);
module.exports = Survey;
