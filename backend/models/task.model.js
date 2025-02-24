const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["inprogress", "completed", "canceled"],
      default: "inprogress",
    },
    dueDate: { type: Date, required: true },
    assignTo: { type: Schema.Types.ObjectId, ref: "users" },
    listOf: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: "projects", required: true },
  },
  { timestamps: true }
);

const Task = model("tasks", taskSchema);

module.exports = Task;
