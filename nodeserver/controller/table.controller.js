const Table = require("../models/table");

const tableCreation = async (req, res) => {
  try {
    const body = req.body;
    const newUser = new Table(body);
    const result = await newUser.save();
    res.json(result);
  } catch (error) {
    //console.log(error);
    return res.status(404).json(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await Table.find({});
    res.json(users);
  } catch (error) {
    res.status(404).json({ message: "Could Not Fetch Blogs from DB", error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await Table.findOneAndDelete({ _id: id });
  res.json("Deleted successfully");
};

const editeUser = async (req, res) => {
  const { id } = req.params;
  const filter = { _id: id };
  const update = req.body;
  const result = await Table.findOneAndUpdate(filter, update, { new: true });
  res.json(result);
};

const searchUser = async (req, res) => {
  const { name, city } = req.query;
  const findUser = await Table.find({
    $or: [{ name }, { city }],
  });
  res.json(findUser);
};

module.exports = {
  tableCreation,
  getAllUser,
  deleteUser,
  editeUser,
  searchUser,
};
