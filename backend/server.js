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

// paths
app.use("/api/users", userRoutes);

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
