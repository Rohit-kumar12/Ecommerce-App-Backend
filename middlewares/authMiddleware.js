const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.requireSignIn = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).json({ message: "Unauthorised!" });
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(403).json({ message: "Forbidden" });
    console.log(error);
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    console.log(user)
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
