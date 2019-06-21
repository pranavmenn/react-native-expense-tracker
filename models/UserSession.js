const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema({
  username: {
    type: String
  }
});

module.exports = mongoose.model("UserSession", UserSessionSchema);
