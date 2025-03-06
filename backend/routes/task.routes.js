const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignTaskToUser,
  removeAssignedUser,
  moveTaskToAnotherList,
  getTasksByProject,
} = require("../controllers/task.controller");

const router = express.Router();

const isAuth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");

router.post("/", isAuth, isAdmin, createTask); //Admin Only
router.get("/", isAuth, getAllTasks);
router.get("/:id", isAuth, getTaskById);
router.put("/:id", isAuth, isAdmin, updateTask); //Admin Only
router.delete("/:id", isAuth, isAdmin, deleteTask); //Admin Only
router.put("/:taskId/assign", isAuth, isAdmin, assignTaskToUser); //Admin Only
router.put("/:taskId/unassign", isAuth, isAdmin, removeAssignedUser); //Admin Only
router.put("/:taskId/move", isAuth, moveTaskToAnotherList);
router.get("/project/:projectId", isAuth, getTasksByProject);

module.exports = router;
