const isAuthenticated = (req, res, next) => {
  console.log("Session:", req.session);
  console.log("User:", req.user);
  console.log("Authenticated:", req.isAuthenticated());

  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    message: "Unauthorized. Please login first."
  });
};

module.exports = isAuthenticated;