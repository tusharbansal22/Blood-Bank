const jwt = require("jsonwebtoken");
const db = require("./db");

exports.restrictToAdmin = async function (req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Admin" });
    } else {
      const info = jwt.verify(token, process.env.JWT_SECRET);
      const docRef = db.collection('admins').doc(info.id)
      const doc = await docRef.get();
      if (!doc.exists) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized Admin" });
      }
      req.id = info.id;
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
      const docRef = db.collection('bloodbanks').doc(info.id)
      const doc = await docRef.get();
      if (!doc.exists) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized Blood Bank" });
      }
      req.id = info.id;
      next();
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal sever error" });
  }
};
