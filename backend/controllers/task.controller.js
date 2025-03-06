const Task = require("../models/task.model");
const User = require("../models/user.model");

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

    task.listOf = listOf;
    await task.save();

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
