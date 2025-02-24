const { Schema, model } = require("mongoose");

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["inprogress", "completed", "canceled"],
      default: "inprogress",
    },
    owner: { type: Schema.Types.ObjectId, ref: "users", required: true },
    dueDate: { type: Date, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "users" }],
    tasks: [{ type: Schema.Types.ObjectId, ref: "tasks" }],
  },
  { timestamps: true }
);

const Project = model("projects", projectSchema);

module.exports = Project;
