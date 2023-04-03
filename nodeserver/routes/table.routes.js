const express = require("express");
const router = express.Router();

const cors = require("cors");

const {
  tableCreation,
  getAllUser,
  deleteUser,
  editeUser,
  searchUser,
} = require("../controller/table.controller");

router.post("/table", tableCreation);
router.get("/table", cors(), getAllUser);
router.delete("/table/:id", deleteUser);
router.patch("/table/:id", editeUser);
router.get("/table/search", searchUser);

module.exports = router;
