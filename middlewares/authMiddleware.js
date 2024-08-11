const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required for authentication",
    });
  }

  try {
    const bearerToken = token.split(" ")[1];
    const decodedData = jwt.verify(bearerToken, process.env.SECRET_KEY);

    req.user = decodedData.user;
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid token!",
    });
  }

  return next();
};

module.exports = verifyToken;
