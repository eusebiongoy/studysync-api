const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swagger");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");

app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

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