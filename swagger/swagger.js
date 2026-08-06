const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "StudySync API",
      version: "1.0.0",
      description: "Student Academic Management System API"
    },

    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || "http://localhost:3000"
      }
    ],

    components: {
      securitySchemes: {
        googleOAuth: {
          type: "oauth2",
          flows: {
            authorizationCode: {
              authorizationUrl:
                "https://accounts.google.com/o/oauth2/v2/auth",

              tokenUrl:
                "https://oauth2.googleapis.com/token",

              scopes: {
                profile: "View your Google profile",
                email: "View your email address"
              }
            }
          }
        }
      }
    }
  },

  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;