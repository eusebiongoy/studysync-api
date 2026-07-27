const Course = require("../models/Course");

// GET all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json(courses);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// GET single course
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.status(200).json(course);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


// CREATE course
const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    res.status(201).json(course);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// UPDATE course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.status(200).json(course);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// DELETE course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    res.status(200).json({
      message: "Course deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};


module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
};