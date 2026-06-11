const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");

const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/task.controller");

router.use(authenticate);

router.post("/", createTask);

router.get("/", getTasks);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;