import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    deleteTask
} from "../redux/taskSlice";

const TaskCard = ({
    task
}) => {

    const dispatch =
        useDispatch();

    return (
        <div className="bg-white shadow p-4 rounded">

            <h3 className="font-bold">
                {task.title}
            </h3>

            <p>
                {task.description}
            </p>

            <span>
                {task.status}
            </span>

            <div className="flex gap-2 mt-3">

                <Link
                    to={`/tasks/edit/${task._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Edit
                </Link>

                <button
                    onClick={() =>
                        dispatch(
                            deleteTask(task._id)
                        )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>

            </div>

        </div>
    );
};

export default TaskCard;