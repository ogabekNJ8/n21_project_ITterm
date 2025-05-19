const { Schema, model } = require("mongoose");

const visitorSchema = new Schema({
  ip: {
    type: String,
    required: true,
    trim: true,
  },
  os: {
    type: String,
    trim: true,
  },
  device: {
    type: String,
    trim: true,
  },
  browser: {
    type: String,
    trim: true,
  },
  registration_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Visitor", visitorSchema);
