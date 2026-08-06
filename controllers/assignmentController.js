const Assignment = require("../models/Assignment");

// GET all assignments
const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();

    res.status(200).json(assignments);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET single assignment
const getAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    res.status(200).json(assignment);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// CREATE assignment
const createAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);

    res.status(201).json(assignment);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// UPDATE assignment
const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    res.status(200).json(assignment);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// DELETE assignment
const deleteAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      return res.status(404).json({
        message: "Assignment not found"
      });
    }

    res.status(200).json({
      message: "Assignment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  getAssignments,
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment
};