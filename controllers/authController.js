const bcrypt = require("bcrypt");
const User = require("../models/User");

async function getRegister(req, res) {
  res.render("auth/register", { error: null });
}

async function postRegister(req, res) {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.render("auth/register", { error: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.render("auth/register", { error: "Passwords do not match." });
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.render("auth/register", { error: "User already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    passwordHash
  });

  req.session.userId = user._id;
  req.session.user = { id: user._id, username: user.username };
  res.redirect("/students");
}

async function getLogin(req, res) {
  res.render("auth/login", { error: null });
}

async function postLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("auth/login", { error: "Email and password are required." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.render("auth/login", { error: "Invalid credentials." });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.render("auth/login", { error: "Invalid credentials." });
  }

  req.session.userId = user._id;
  req.session.user = { id: user._id, username: user.username };
  res.redirect("/students");
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
}

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout
};
