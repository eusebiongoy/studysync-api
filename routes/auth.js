const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: OAuth authentication routes
 */


/**
 * @swagger
 * /auth/google:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Start Google OAuth login
 *     description: Redirects user to Google authentication.
 *     responses:
 *       302:
 *         description: Redirect to Google login
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);


/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Google OAuth callback
 *     description: Handles Google authentication response.
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Authentication failed
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login"
  }),
  (req, res) => {
    res.status(200).json({
      message: "Login successful",
      user: req.user
    });
  }
);


/**
 * @swagger
 * /auth/login:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Authentication failure response
 *     responses:
 *       401:
 *         description: Google authentication failed
 */
router.get("/login", (req, res) => {
  res.status(401).json({
    message: "Google authentication failed"
  });
});


/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Logout current user
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.status(200).json({
        message: "Logged out successfully"
      });
    });
  });
});


module.exports = router;