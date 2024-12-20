const mongoose = require("mongoose");

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },

  order: {
    type: Number,
    required: true,
    unique: true,
  },

  count: {
    type: Number,
    default: 0,
  },
});

const Status = mongoose.model("Status", statusSchema);

module.exports = Status;
