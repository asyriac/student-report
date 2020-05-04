const Employee = require("../models/Employee");

// @desc    Sigup page
// @route   GET /sign-up
module.exports.get_signup = (req, res) => {
  if (req.session.userid) {
    return res.redirect("/employee/home");
  }
  return res.render("signup", {
    title: "Sign Up",
    errorMessage: req.flash("error"),
  });
};

// @desc    Sigup page
// @route   POST /sign-up
module.exports.post_signup = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  const emp = await Employee.findOne({ email });
  if (!emp) {
    if (password !== cpassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("back");
    }
    const emp = await Employee.create({ name, email, password });
    req.flash("error", "Account created.");
    return res.redirect("/employee/login");
  } else {
    req.flash("error", "Username already exists");
    return res.redirect("back");
  }
};

// @desc    Login page
// @route   GET /login
module.exports.get_login = (req, res) => {
  if (req.session.userid) {
    return res.redirect("/employee/home");
  }
  return res.render("login", {
    title: "Sign Up",
    errorMessage: req.flash("error"),
  });
};

// @desc    Login page
// @route   POST /login
module.exports.post_login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emp = await Employee.find({ email });

    if (emp.length === 0) {
      req.flash("error", "Invalid credentials.");
      return res.redirect("/employee/login");
    }

    const isMatch = await emp[0].matchPassword(password);
    if (!isMatch) {
      req.flash("error", "Invalid credentials.");
      return res.redirect("/employee/login");
    }

    req.session.userid = emp[0].id;
    return res.redirect("/employee/home");
  } catch (err) {
    console.log(err);
  }
};

// @desc    Home page
// @route   GET /home
module.exports.get_home = async (req, res) => {
  const emp = await Employee.findById(req.session.userid);
  return res.render("home", {
    title: "Home",
    name: emp.name,
  });
};

// @desc    Signout page
// @route   POST /sign-out
module.exports.signout = (req, res) => {
  req.session.destroy();
  return res.redirect("/employee/login");
};
