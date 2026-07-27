const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required"
    });
  }

  next();
};


const validateCourse = (req, res, next) => {
  const {
    userId,
    courseName,
    instructor,
    semester,
    credits
  } = req.body;

  if (
    !userId ||
    !courseName ||
    !instructor ||
    !semester ||
    !credits
  ) {
    return res.status(400).json({
      message: "userId, courseName, instructor, semester, and credits are required"
    });
  }

  if (typeof credits !== "number") {
    return res.status(400).json({
      message: "Credits must be a number"
    });
  }

  next();
};


module.exports = {
  validateUser,
  validateCourse
};