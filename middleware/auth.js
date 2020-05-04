const Employee = require("../models/Employee");

exports.checkAuth = async (req, res, next) => {
  const emp = await Employee.findById(req.session.userid);
  if (!emp) {
    return res.redirect("/employee/login");
  }
  next();
};
