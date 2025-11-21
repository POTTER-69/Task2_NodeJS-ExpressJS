const path = require("path");
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const { attachUserToLocals } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use(attachUserToLocals);

app.use("/auth", authRoutes);
app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.redirect("/students");
});

const port = process.env.PORT || 3000;

connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("Server running on port", port);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
