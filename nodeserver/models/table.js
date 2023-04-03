const mongoose = require("mongoose");
const tableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    city: {
      type: String,
    },
    occupation: {
      type: String,
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
