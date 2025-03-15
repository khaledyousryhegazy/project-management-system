require("dotenv").config();
const cors = require("cors");

const express = require("express");
const app = express();
const path = require("path");

// socket.io setup for notifications
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

module.exports = { io, server };

const connectDB = require("./connection/connectDB");

// middlewares
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// Socket.io connection
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // socket.emit("notification", {
  //   message: "Welcome! Socket.io is working ✅",
  // });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
  });
});

app.listen(process.env.PORT, () => {
  console.log(`app is listen on ${process.env.PORT}`);
});
