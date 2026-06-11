import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { fetchTasks } from "../redux/taskSlice";
import { fetchAnalytics } from "../redux/adminSlice";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(
        (state) => state.auth
    );

    const { tasks } = useSelector(
        (state) => state.tasks
    );

    const { analytics } = useSelector(
        (state) => state.admin
    );

    useEffect(() => {
        dispatch(fetchTasks());

        if (user?.role === "Admin") {
            dispatch(fetchAnalytics());
        }
    }, [dispatch, user]);

    const completedTasks =
        tasks.filter(
            (task) =>
                task.status === "Completed"
        ).length;

    const pendingTasks =
        tasks.filter(
            (task) =>
                task.status === "Pending"
        ).length;

    const recentTasks =
        tasks.slice(0, 5);

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

                {/* Welcome */}

                <div className="bg-white shadow rounded-lg p-6 mb-6">

                    <h1 className="text-3xl font-bold">
                        Welcome, {user?.name}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage tasks and track activity.
                    </p>

                </div>

                {/* User Stats */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white shadow rounded-lg p-5">

                        <h3 className="text-gray-500">
                            Total Tasks
                        </h3>

                        <p className="text-3xl font-bold mt-2">
                            {tasks.length}
                        </p>

                    </div>

                    <div className="bg-white shadow rounded-lg p-5">

                        <h3 className="text-gray-500">
                            Completed
                        </h3>

                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {completedTasks}
                        </p>

                    </div>

                    <div className="bg-white shadow rounded-lg p-5">

                        <h3 className="text-gray-500">
                            Pending
                        </h3>

                        <p className="text-3xl font-bold text-yellow-600 mt-2">
                            {pendingTasks}
                        </p>

                    </div>

                </div>

                {/* Quick Actions */}

                <div className="bg-white shadow rounded-lg p-6 mb-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Quick Actions
                    </h2>

                    <div className="flex flex-wrap gap-4">

                        <Link
                            to="/tasks/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Create Task
                        </Link>

                        <Link
                            to="/tasks"
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            View Tasks
                        </Link>

                        {user?.role === "Admin" && (
                            <Link
                                to="/admin"
                                className="bg-purple-600 text-white px-4 py-2 rounded"
                            >
                                Admin Dashboard
                            </Link>
                        )}

                    </div>

                </div>

                {/* Admin Analytics */}

                {user?.role === "Admin" && (

                    <div className="mb-8">

                        <h2 className="text-2xl font-bold mb-4">
                            System Analytics
                        </h2>

                        <div className="grid md:grid-cols-4 gap-5">

                            <div className="bg-white shadow rounded-lg p-5">

                                <h3 className="text-gray-500">
                                    Users
                                </h3>

                                <p className="text-3xl font-bold">
                                    {analytics.totalUsers || 0}
                                </p>

                            </div>

                            <div className="bg-white shadow rounded-lg p-5">

                                <h3 className="text-gray-500">
                                    Tasks
                                </h3>

                                <p className="text-3xl font-bold">
                                    {analytics.totalTasks || 0}
                                </p>

                            </div>

                            <div className="bg-white shadow rounded-lg p-5">

                                <h3 className="text-gray-500">
                                    Completed
                                </h3>

                                <p className="text-3xl font-bold text-green-600">
                                    {analytics.completedTasks || 0}
                                </p>

                            </div>

                            <div className="bg-white shadow rounded-lg p-5">

                                <h3 className="text-gray-500">
                                    Pending
                                </h3>

                                <p className="text-3xl font-bold text-yellow-600">
                                    {analytics.pendingTasks || 0}
                                </p>

                            </div>

                        </div>

                    </div>

                )}

                {/* Recent Tasks */}

                <div className="bg-white shadow rounded-lg p-6">

                    <div className="flex justify-between items-center mb-4">

                        <h2 className="text-xl font-semibold">
                            Recent Tasks
                        </h2>

                        <Link
                            to="/tasks"
                            className="text-blue-600"
                        >
                            View All
                        </Link>

                    </div>

                    {recentTasks.length === 0 ? (
                        <p className="text-gray-500">
                            No tasks available.
                        </p>
                    ) : (
                        <div className="space-y-3">

                            {recentTasks.map(
                                (task) => (
                                    <div
                                        key={task._id}
                                        className="border rounded p-4 flex justify-between"
                                    >

                                        <div>

                                            <h3 className="font-semibold">
                                                {task.title}
                                            </h3>

                                            <p className="text-gray-500 text-sm">
                                                {task.description}
                                            </p>

                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded text-sm ${task.status ===
                                                    "Completed"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                }`}
                                        >
                                            {task.status}
                                        </span>

                                    </div>
                                )
                            )}

                        </div>
                    )}

                </div>

            </div>
        </>
    );
};

export default Dashboard;