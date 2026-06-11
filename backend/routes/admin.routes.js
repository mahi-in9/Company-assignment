const express =
    require("express");

const router =
    express.Router();

const authenticate =
    require("../middlewares/auth.middleware");

const adminOnly =
    require("../middlewares/adminOnly");

const {
    getUsers,
    deleteUser,
    updateUserStatus,
    getAllTasks,
    deleteAnyTask,
    getActivityLogs,
    getAnalytics
} = require(
    "../controllers/admin.controller"
);

router.use(
    authenticate
);

router.use(
    adminOnly
);

router.get(
    "/users",
    getUsers
);

router.delete(
    "/users/:id",
    deleteUser
);

router.patch(
    "/users/:id/status",
    updateUserStatus
);

router.get(
    "/tasks",
    getAllTasks
);

router.delete(
    "/tasks/:id",
    deleteAnyTask
);

router.get(
    "/activity-logs",
    getActivityLogs
);

router.get(
    "/analytics",
    getAnalytics
);

module.exports = router;