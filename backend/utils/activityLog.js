const ActivityLog =
    require("../models/activity.log");

const logActivity = async ({
    user,
    action,
    task,
    description
}) => {
    try {
        await ActivityLog.create({
            user,
            action,
            task,
            description
        });
    } catch (error) {
        console.log(
            "Activity Log Error",
            error.message
        );
    }
};

module.exports = logActivity;