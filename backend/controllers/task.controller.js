const Task = require("../models/task.model");
const logActivity =
    require("../utils/activityLog");

const createTask = async (
    req,
    res
) => {
    try {
        const {
            title,
            description
        } = req.body;

        const task =
            await Task.create({
                title,
                description,
                createdBy: req.user._id
            });

        await logActivity({
            user: req.user._id,
            task: task._id,
            action: "CREATE_TASK",
            description:
                "Task created"
        });

        res.status(201).json({
            success: true,
            message:
                "Task created successfully",
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTasks = async (
    req,
    res
) => {
    try {
        let tasks;

        if (
            req.user.role === "Admin"
        ) {
            tasks = await Task.find()
                .populate(
                    "createdBy",
                    "name email"
                );
        } else {
            tasks = await Task.find({
                createdBy:
                    req.user._id
            });
        }

        res.json({
            success: true,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTaskById = async (
    req,
    res
) => {
    try {
        const task =
            await Task.findById(
                req.params.id
            );

        if (!task) {
            return res.status(404).json({
                success: false,
                message:
                    "Task not found"
            });
        }

        if (
            req.user.role !==
            "Admin" &&
            task.createdBy.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Access denied"
            });
        }

        res.json({
            success: true,
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateTask = async (
    req,
    res
) => {
    try {
        const task =
            await Task.findById(
                req.params.id
            );

        if (!task) {
            return res.status(404).json({
                success: false,
                message:
                    "Task not found"
            });
        }

        if (
            req.user.role !==
            "Admin" &&
            task.createdBy.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Access denied"
            });
        }

        Object.assign(
            task,
            req.body
        );

        await task.save();

        await logActivity({
            user: req.user._id,
            task: task._id,
            action: "UPDATE_TASK",
            description:
                "Task updated"
        });

        res.json({
            success: true,
            message:
                "Task updated",
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteTask = async (
    req,
    res
) => {
    try {
        const task =
            await Task.findById(
                req.params.id
            );

        if (!task) {
            return res.status(404).json({
                success: false,
                message:
                    "Task not found"
            });
        }

        if (
            req.user.role !==
            "Admin" &&
            task.createdBy.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Access denied"
            });
        }

        await logActivity({
            user: req.user._id,
            task: task._id,
            action: "DELETE_TASK",
            description:
                "Task deleted"
        });

        await task.deleteOne();

        res.json({
            success: true,
            message:
                "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};