require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();

const connectDB = require("./connection/connectDB");

// middlewares
app.use(express.json());
app.use(cors());

// routes
// imports
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");

// paths
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send({
    name: "project management system",
    createdBy: "khaled yousry hegazy",
  });
});

connectDB(); // connect database function

app.listen(process.env.PORT, () => {
  console.log(`app is listen on ${process.env.PORT}`);
});
