const express = require("express");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addTaskToProject,
  removeTaskFromProject,
  addMemberToProject,
  removeMemberFromProject,
  updateProjectStatus,
  getProjectByMember,
} = require("../controllers/project.controller");

const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/isAdmin.middleware");

const router = express.Router();

// about projects
router.get("/all", auth, getAllProjects);
router.get("/:id", auth, getProjectById);
router.get("/user/:memberId", auth, getProjectByMember);
router.post("/create", auth, isAdmin, createProject); // ⬅️ Admin
router.patch("/:id", auth, isAdmin, updateProject); // ⬅️ Admin
router.delete("/:id", auth, isAdmin, deleteProject); // ⬅️ Admin

// tasks of the project
router.post("/:projectId/tasks", auth, addTaskToProject);
router.delete("/:projectId/tasks", auth, removeTaskFromProject);

// users in the project
router.post("/:projectId/members", auth, isAdmin, addMemberToProject); // ⬅️ Admin
router.delete("/:projectId/members", auth, isAdmin, removeMemberFromProject); // ⬅️ Admin

// update status of the project
router.patch("/:projectId/status", auth, isAdmin, updateProjectStatus); // ⬅️ Admin

module.exports = router;
