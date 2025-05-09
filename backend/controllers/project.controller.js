const Project = require("../models/project.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

// 1️⃣ createProject
const createProject = async (req, res) => {
  try {
    const { title, description, status, owner, dueDate, members, tasks } =
      req.body;

    if (!title || !owner || !dueDate) {
      return res.status(400).json({
        success: false,
        message: "Title, owner, and dueDate are required.",
      });
    }

    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return res.status(409).json({
        success: false,
        message: "Project with this title already exists.",
      });
    }

    const newProject = new Project({
      title,
      description,
      status,
      owner,
      dueDate,
      members,
      tasks,
    });
    await newProject.save();

    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ getAllProjects [with pagination]
const getAllProjects = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const totalProjects = await Project.countDocuments();

    const projects = await Project.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      totalProjects,
      totalPages: Math.ceil(totalProjects / limit),
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// 3️⃣ getProjectById
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id)
      .populate("members")
      .populate("tasks");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Exist.",
      });
    }

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 getProjectByMember
const getProjectByMember = async (req, res) => {
  try {
    const { memberId } = req.params;

    if (!memberId) {
      return res.status(400).json({
        success: false,
        message: "Member ID is required.",
      });
    }

    const projects = await Project.find({ members: memberId });

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found for this member.",
      });
    }

    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 4️⃣ updateProject
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({
        success: false,
        message: "Please make sure the data and ID are valid.",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 5️⃣ deleteProject
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "id is required" });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6️⃣ addTaskToProject
const addTaskToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { taskId } = req.body; //

    if (!projectId || !taskId) {
      return res.status(400).json({
        success: false,
        message: "Project ID and Task ID are required",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (project.tasks.includes(taskId.toString())) {
      return res.status(400).json({
        success: false,
        message: "Task already exists in the project",
      });
    }

    project.tasks.push(taskId);
    await project.save();

    return res.status(200).json({
      success: true,
      data: project,
      message: "Task has been added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// 7️⃣ removeTaskFromProject
const removeTaskFromProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { taskId } = req.body;

    if (!projectId || !taskId) {
      return res.status(400).json({
        success: false,
        message: "Project ID and Task ID are required",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (!project.tasks.includes(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Task not found in this project",
      });
    }

    project.tasks = project.tasks.filter((id) => id.toString() !== taskId);
    await project.save();

    return res.status(200).json({
      success: true,
      data: project,
      message: "Task removed from project successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 8️⃣ addMemberToProject

const addMemberToProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    if (!userId || !projectId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Project ID are required",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (project.members.includes(userId.toString())) {
      return res.status(400).json({
        success: false,
        message: "User already exists in the project",
      });
    }

    project.members.push(userId);
    await project.save();

    return res.status(200).json({
      success: true,
      data: project,
      message: "User has been added successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 9️⃣ removeMemberFromProject
const removeMemberFromProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { userId } = req.body;

    if (!userId || !projectId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Project ID are required",
      });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (!project.members.some((id) => id.equals(userId))) {
      return res.status(400).json({
        success: false,
        message: "User not found in the project",
      });
    }

    project.members = project.members.filter((id) => !id.equals(userId));
    await project.save();

    return res.status(200).json({
      success: true,
      data: project,
      message: "Member removed from project successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔟 updateProjectStatus
const updateProjectStatus = async (req, res) => {
  try {
    // enum: ["inprogress", "completed", "canceled"],
    // default: "inprogress",

    const { projectId } = req.params;
    let { status } = req.body;

    if (!status || !projectId) {
      return res.status(400).json({
        success: false,
        message: "Project ID and Status are required",
      });
    }

    status = status.trim().toLowerCase();
    const validStatuses = ["inProgress", "completed", "canceled"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const project = await Project.findByIdAndUpdate(
      projectId,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      data: project,
      message: "Project Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectByMember,
  updateProject,
  deleteProject,
  addTaskToProject,
  removeTaskFromProject,
  addMemberToProject,
  removeMemberFromProject,
  updateProjectStatus,
};
