const Project = require("../models/project.model");

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

    const project = Project.findById(id);

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
// 7️⃣ removeTaskFromProject
// 8️⃣ addMemberToProject
// 9️⃣ removeMemberFromProject
// 🔟 updateProjectStatus

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
