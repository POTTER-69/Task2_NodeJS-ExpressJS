const express = require("express");
const {
  listStudents,
  showStudent,
  newStudentForm,
  createStudent,
  editStudentForm,
  updateStudent,
  deleteStudent
} = require("../controllers/studentController");
const { ensureAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", ensureAuth, listStudents);
router.get("/new", ensureAuth, newStudentForm);
router.post("/", ensureAuth, createStudent);
router.get("/:id", ensureAuth, showStudent);
router.get("/:id/edit", ensureAuth, editStudentForm);
router.post("/:id/edit", ensureAuth, updateStudent);
router.post("/:id/delete", ensureAuth, deleteStudent);

module.exports = router;
