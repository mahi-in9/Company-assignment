import {
    Link
} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="bg-gray-900 text-white w-64 min-h-screen p-4">

            <h2 className="text-xl font-bold mb-6">
                Admin Panel
            </h2>

            <div className="flex flex-col gap-3">

                <Link to="/admin">
                    Dashboard
                </Link>

                <Link to="/admin/users">
                    Users
                </Link>

                <Link to="/admin/tasks">
                    Tasks
                </Link>

                <Link to="/admin/logs">
                    Activity Logs
                </Link>

            </div>

        </div>
    );
};

export default Sidebar;