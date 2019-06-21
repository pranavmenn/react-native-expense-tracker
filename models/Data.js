const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  userId: {
    type: String
  },
  sno: {
    type: Number
  },
  date: {
    type: Date
  },
  name: {
    type: String
  },

  amount: {
    type: Number
  }
});

module.exports = mongoose.model("Data", DataSchema);
