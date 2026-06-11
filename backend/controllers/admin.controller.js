const User =
    require("../models/user.model");

const Task =
    require("../models/task.model");

const ActivityLog =
    require("../models/activity.log");

const getUsers =
    async (req, res) => {
        try {
            const users =
                await User.find()
                    .select("-password");

            res.json({
                success: true,
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };

const deleteUser =
    async (req, res) => {
        try {
            await User.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "User deleted"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };

const updateUserStatus =
    async (req, res) => {
        try {
            const user =
                await User.findByIdAndUpdate(
                    req.params.id,
                    {
                        status:
                            req.body.status
                    },
                    {
                        new: true
                    }
                );

            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };

const getAllTasks =
    async (req, res) => {
        try {
            const tasks =
                await Task.find()
                    .populate(
                        "createdBy",
                        "name email"
                    );

            res.json({
                success: true,
                data: tasks
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };

const deleteAnyTask =
    async (req, res) => {
        try {
            await Task.findByIdAndDelete(
                req.params.id
            );

            res.json({
                success: true,
                message:
                    "Task deleted"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };

const getActivityLogs =
    async (req, res) => {
        try {
            const logs =
                await ActivityLog.find()
                    .populate(
                        "user",
                        "name email"
                    )
                    .sort({
                        timestamp: -1
                    });

            res.json({
                success: true,
                data: logs
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };

const getAnalytics =
    async (req, res) => {
        try {
            const totalUsers =
                await User.countDocuments();

            const totalTasks =
                await Task.countDocuments();

            const completedTasks =
                await Task.countDocuments(
                    {
                        status:
                            "Completed"
                    }
                );

            const pendingTasks =
                await Task.countDocuments(
                    {
                        status:
                            "Pending"
                    }
                );

            res.json({
                success: true,
                data: {
                    totalUsers,
                    totalTasks,
                    completedTasks,
                    pendingTasks
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message:
                    error.message
            });
        }
    };

module.exports = {
    getUsers,
    deleteUser,
    updateUserStatus,
    getAllTasks,
    deleteAnyTask,
    getActivityLogs,
    getAnalytics
};