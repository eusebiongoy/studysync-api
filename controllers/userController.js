const User = require("../models/User");

// GET all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

// GET single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};

// CREATE user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// UPDATE user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// DELETE user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};