import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchTasks } from "../redux/taskSlice";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const TaskList = () => {
    const dispatch = useDispatch();

    const { tasks, loading, error } = useSelector(
        (state) => state.tasks
    );

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto p-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">

                    <div>
                        <h1 className="text-3xl font-bold">
                            My Tasks
                        </h1>

                        <p className="text-gray-500">
                            Manage all your tasks here
                        </p>
                    </div>

                    <Link
                        to="/tasks/create"
                        className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        + Create Task
                    </Link>

                </div>

                {/* Loading */}
                {loading && <Loader />}

                {/* Error */}
                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {/* Empty State */}
                {!loading && tasks.length === 0 && (
                    <div className="bg-white shadow rounded p-8 text-center">
                        <h2 className="text-xl font-semibold mb-2">
                            No Tasks Found
                        </h2>

                        <p className="text-gray-500 mb-4">
                            Create your first task to get started.
                        </p>

                        <Link
                            to="/tasks/create"
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Create Task
                        </Link>
                    </div>
                )}

                {/* Tasks Grid */}
                {tasks.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                        {tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                            />
                        ))}

                    </div>
                )}

            </div>
        </>
    );
};

export default TaskList;