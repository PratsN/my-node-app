const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT;
const userRouter = require("./routes/user.routes");
const tableRouter = require("./routes/table.routes");
const MONGO_URL =
  "mongodb+srv://pratiksha:pratiksha11@cluster0.4mxlvfp.mongodb.net/nodeuser?retryWrites=true&w=majority";

mongoose
  .connect(`${MONGO_URL}`)
  .then(() => console.log("connected to mongoDB "))
  .catch((e) => console.log(e));

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(userRouter);
app.use(tableRouter);

app.get("/", (req, res) => {
  return res.status(200).json("server is listening");
});

app.listen(process.env.PORT || 3002, () => {
  console.log("Server is running on PORT", PORT);
});
