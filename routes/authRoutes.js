const express = require("express");
const {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout
} = require("../controllers/authController");

const router = express.Router();

router.get("/register", getRegister);
router.post("/register", postRegister);

router.get("/login", getLogin);
router.post("/login", postLogin);

router.post("/logout", logout);

module.exports = router;
