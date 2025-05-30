const Project = require("../models/project.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

const { io } = require("../server");

// 1️⃣ createTask
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate, assignTo, listOf, project } =
      req.body;

    if (!title || !status || !dueDate || !assignTo || !listOf || !project) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      assignTo,
      listOf,
      project,
    });

    await newTask.save();

    await addTaskToProject(project, newTask._id);
    await addMemberToProject(project, newTask.assignTo);

    io.to(assignTo).emit("notification", {
      message: `You have been assigned a new task: ${title}`,
      taskId: newTask._id,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2️⃣ getAllTasks [with pagination]
const getAllTasks = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;

    const totalTasks = await Task.countDocuments();
    const tasks = await Task.find().skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      data: tasks,
      page,
      limit,
      totalTasks,
      totalPages: Math.ceil(totalTasks / limit),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3️⃣ getTaskById
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task)
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });

    return res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4️⃣ updateTask
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Valid  data is required" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, data, { new: true });

    io.to(task.assignTo).emit("notification", {
      message: `Task updated: ${updatedTask.title}`,
      taskId: updatedTask._id,
    });

    return res.status(200).json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 5️⃣ deleteTask
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    io.to(task.assignTo).emit("notification", {
      message: `Task Deleted: ${task.title}`,
      taskId: task._id,
    });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 6️⃣ updateTaskStatus
const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    let { status } = req.body;

    if (!status) {
      return res
        .status(404)
        .json({ success: false, message: "status not found" });
    }

    status = status.trim().toLowerCase();
    const validStatus = ["inprogress", "completed", "canceled"];

    if (!validStatus.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({
      success: true,
      data: task,
      message: "Task status updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 7️⃣ assignTaskToUser
const assignTaskToUser = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    task.assignTo = userId;
    await task.save();

    io.to(userId).emit("notification", {
      message: `Task ${task.title} assigned to you`,
      taskId: task._id,
    });

    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    return res.status(200).json({
      success: true,
      data: task,
      message: "Task assigned to user successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 8️⃣ removeAssignedUser
const removeAssignedUser = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    if (!task.assignTo) {
      return res.status(400).json({
        success: false,
        message: "No user is assigned to this task",
      });
    }

    io.to(task.assignTo).emit("notification", {
      message: `You removed from: ${task.title}`,
      taskId: task._id,
    });

    task.assignTo = null;
    await task.save();

    return res
      .status(200)
      .json({ success: true, message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 9️⃣ moveTaskToAnotherList → (ToDo, InProgress, Done).
const moveTaskToAnotherList = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { listOf } = req.body;

    if (!listOf) {
      return res
        .status(400)
        .json({ success: false, message: "New list is required" });
    }

    const validLists = ["ToDo", "InProgress", "Done"];
    if (!validLists.includes(listOf)) {
      return res.status(400).json({
        success: false,
        message: "Invalid list. Must be 'ToDo', 'InProgress', or 'Done'.",
      });
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    const project = await Project.findById(task.project);
    const owner = project.owner;

    task.listOf = listOf;
    await task.save();

    io.to(owner).emit("notification", {
      message: `Task ${task.title} Moved To ${task.listOf} By ${task.assignTo}`,
      taskId: task._id,
    });

    return res.status(200).json({
      success: true,
      message: `Task moved to ${listOf} successfully`,
      data: task,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔟 getTasksByProject
const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    if (!projectId) {
      return res
        .status(400)
        .json({ success: false, message: "Project ID is required" });
    }

    const tasks = await Task.find({ project: projectId });

    return res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addTaskToProject = async (projectId, taskId) => {
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return console.log("Project not found");
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return console.log("Task not found");
    }

    if (project.tasks.includes(taskId.toString())) {
      return console.log("Task already exists in the project");
    }

    project.tasks.push(taskId);
    await project.save();
  } catch (error) {
    return console.log("Error adding task to project:", error.message);
  }
};

const addMemberToProject = async (projectId, userId) => {
  try {
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
  } catch (error) {
    return console.log("Error adding member to project:", error.message);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
  assignTaskToUser,
  removeAssignedUser,
  moveTaskToAnotherList,
  getTasksByProject,
};
