const express = require("express");
const router = express.Router();
const {
  tableCreation,
  getAllUser,
  deleteUser,
  editeUser,
  searchUser,
} = require("../controller/table.controller");

router.post("/table", tableCreation);
router.get("/table", getAllUser);
router.delete("/table/:id", deleteUser);
router.patch("/table/:id", editeUser);
router.get("/table/search", searchUser);

module.exports = router;
