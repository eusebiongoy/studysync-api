const express = require("express");
const cors = require("cors");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");
const passport = require("./config/passport");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "studysyncsecret",
    resave: false,
    saveUninitialized: false
  })
);

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const assignmentRoutes = require("./routes/assignments");
const sessionRoutes = require("./routes/sessions");
const resourceRoutes = require("./routes/resources");
const authRoutes = require("./routes/auth");

app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/assignments", assignmentRoutes);
app.use("/sessions", sessionRoutes);
app.use("/resources", resourceRoutes);
app.use("/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to StudySync API"
  });
});

// Error handling middleware
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;