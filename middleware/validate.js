const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (req.method === "POST" || req.method === "PUT") {
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }
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


  if (req.method === "POST" || req.method === "PUT") {
    if (
      !userId ||
      !courseName ||
      !instructor ||
      !semester ||
      credits === undefined
    ) {
      return res.status(400).json({
        message:
          "userId, courseName, instructor, semester, and credits are required"
      });
    }
  }


  if (credits !== undefined && typeof credits !== "number") {
    return res.status(400).json({
      message: "Credits must be a number"
    });
  }


  next();
};


const validateAssignment = (req, res, next) => {
  const {
    userId,
    courseId,
    title,
    description,
    dueDate,
    priority,
    status
  } = req.body;


  if (req.method === "POST" || req.method === "PUT") {
    if (
      !userId ||
      !courseId ||
      !title ||
      !description ||
      !dueDate ||
      !priority ||
      !status
    ) {
      return res.status(400).json({
        message: "All assignment fields are required"
      });
    }
  }


  next();
};


const validateSession = (req, res, next) => {
  const {
    userId,
    courseId,
    date,
    duration,
    topic
  } = req.body;


  if (req.method === "POST" || req.method === "PUT") {
    if (
      !userId ||
      !courseId ||
      !date ||
      duration === undefined ||
      !topic
    ) {
      return res.status(400).json({
        message: "All study session fields are required"
      });
    }
  }


  if (duration !== undefined && typeof duration !== "number") {
    return res.status(400).json({
      message: "Duration must be a number"
    });
  }


  next();
};


const validateResource = (req, res, next) => {
  const {
    userId,
    courseId,
    title,
    resourceType,
    link
  } = req.body;


  if (req.method === "POST" || req.method === "PUT") {
    if (
      !userId ||
      !courseId ||
      !title ||
      !resourceType ||
      !link
    ) {
      return res.status(400).json({
        message: "All resource fields are required"
      });
    }
  }

  next();
};

module.exports = {
  validateUser,
  validateCourse,
  validateAssignment,
  validateSession,
  validateResource
};