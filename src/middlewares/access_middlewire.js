const jwt = require('jsonwebtoken');

const accessMiddleware = (req, res, next) => {
  try {
    access=req.access;
    if (!access) return res.status(401).json({ message: "You don't have access" });
    next();
  } catch (error) {
    res.status(401).json({ message:error.toString() });
  }
};

module.exports = accessMiddleware;


