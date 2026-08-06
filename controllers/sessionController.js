const Session = require("../models/Session");

// GET all study sessions
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find();

    res.status(200).json(sessions);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET single study session
const getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Study session not found"
      });
    }

    res.status(200).json(session);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// CREATE study session
const createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);

    res.status(201).json(session);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// UPDATE study session
const updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!session) {
      return res.status(404).json({
        message: "Study session not found"
      });
    }

    res.status(200).json(session);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// DELETE study session
const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Study session not found"
      });
    }

    res.status(200).json({
      message: "Study session deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  getSessions,
  getSession,
  createSession,
  updateSession,
  deleteSession
};