const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin");
const BloodBank = require("./models/BloodBank");

exports.restrictToAdmin = async function (req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Admin" });
    } else {
      const info = jwt.verify(token, process.env.JWT_SECRET);
      const user = await Admin.findById({ _id: info._id });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized Admin" });
      }
      req._id = info._id;
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};

exports.restrictToBloodBank = async function (req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Blood Bank" });
    } else {
      const info = jwt.verify(token, process.env.JWT_SECRET);
      const user = await BloodBank.findById({ _id: info._id });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized Blood Bank" });
      }
      req._id = info._id;
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};
