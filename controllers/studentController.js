const Student = require("../models/Student");

async function listStudents(req, res) {
  const search = req.query.search || "";
  const filter = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  const students = await Student.find(filter).sort({ createdAt: -1 });
  res.render("students/index", { students, search });
}

async function showStudent(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    return res.redirect("/students");
  }
  res.render("students/show", { student });
}

function newStudentForm(req, res) {
  res.render("students/new", { error: null, student: {} });
}

async function createStudent(req, res) {
  const { name, age, major, gpa } = req.body;

  if (!name || !age || !major || !gpa) {
    return res.render("students/new", {
      error: "All fields are required.",
      student: { name, age, major, gpa }
    });
  }

  await Student.create({ name, age, major, gpa });
  res.redirect("/students");
}

async function editStudentForm(req, res) {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    return res.redirect("/students");
  }
  res.render("students/edit", { error: null, student });
}

async function updateStudent(req, res) {
  const { id } = req.params;
  const { name, age, major, gpa } = req.body;

  if (!name || !age || !major || !gpa) {
    const student = { _id: id, name, age, major, gpa };
    return res.render("students/edit", {
      error: "All fields are required.",
      student
    });
  }

  await Student.findByIdAndUpdate(id, { name, age, major, gpa });
  res.redirect("/students/" + id);
}

async function deleteStudent(req, res) {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.redirect("/students");
}

module.exports = {
  listStudents,
  showStudent,
  newStudentForm,
  createStudent,
  editStudentForm,
  updateStudent,
  deleteStudent
};
