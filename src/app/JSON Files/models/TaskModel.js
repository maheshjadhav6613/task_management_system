const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],

    dueDate: {
      type: Date,
    },

    estimateTime: {
      type: String,
    },

    tags: {
      type: [String],
    },

    attachments: {
      type: [String],
    },

    description: {
      type: String,
    },

    statusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      // default: "675963ec7a3855d625c88a51",
      default: "6764fa4067d8cd7def023e13",

    },
    statusChangeTimestamps: {
      backlog: { type: Date, default: null },
      todo: { type: Date, default: null },
      doing: { type: Date, default: null },
      done: { type: Date, default: null },
    },
    timeToComplete: {
      type: Number,
    },
  },
  { timestamps: true }
);

taskSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update && update.statusId) {
    const statusMap = {
      "675963ec7a3855d625c88a51": "backlog",
      "67595befc31f467498591790": "todo",
      "675963ec7a3855d625c88a51": "doing",
      "675c26ba844809a7463a1099": "done",
    };

    const statusName = statusMap[update.statusId.toString()];
    if (statusName) {
      update["statusChangeTimestamps." + statusName] = new Date();

      if (statusName === "done") {
        const task = await this.model.findOne(this.getQuery());
        const startTimestamp =
          task.statusChangeTimestamps.todo ||
          task.statusChangeTimestamps.doing ||
          task.statusChangeTimestamps.backlog;

        if (startTimestamp) {
          update.timeToComplete =
            new Date().getTime() - startTimestamp.getTime();
        }
      }
    }
  }
  next();
});

taskSchema.statics.getOverallStats = async function () {
  const now = new Date();

  const stats = await this.aggregate([
    {
      $facet: {
        totalTasks: [{ $count: "count" }],
        completedTasks: [
          {
            $match: {
              statusId: {
                $eq: new mongoose.Types.ObjectId("675963ec7a3855d625c88a51"),
              },
            },
          },
          { $count: "count" },
        ],
        pendingTasks: [
          {
            $match: {
              statusId: {
                $ne: new mongoose.Types.ObjectId("675963ec7a3855d625c88a51"),
              },
            },
          },
          { $count: "count" },
        ],
        overdueTasks: [
          {
            $match: {
              dueDate: { $lt: now },
              statusId: {
                $ne: new mongoose.Types.ObjectId("675963ec7a3855d625c88a51"),
              },
            },
          },
          { $count: "count" },
        ],
        priorityCounts: [
          {
            $group: {
              _id: "$priority",
              count: { $sum: 1 },
            },
          },
        ],
      },
    },
    {
      $project: {
        totalTasks: { $arrayElemAt: ["$totalTasks.count", 0] },
        completedTasks: { $arrayElemAt: ["$completedTasks.count", 0] },
        pendingTasks: { $arrayElemAt: ["$pendingTasks.count", 0] },
        overdueTasks: { $arrayElemAt: ["$overdueTasks.count", 0] },
        priorityCounts: {
          $arrayToObject: {
            $map: {
              input: "$priorityCounts",
              as: "item",
              in: { k: "$$item._id", v: "$$item.count" },
            },
          },
        },
      },
    },
  ]);

  return stats[0];
};








module.exports = mongoose.model("Task", taskSchema);
