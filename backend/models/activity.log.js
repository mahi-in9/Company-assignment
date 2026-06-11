const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    action: {
        type: String,
        required: true
    },

    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },

    description: {
        type: String
    },

    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model(
    "ActivityLog",
    activityLogSchema
);