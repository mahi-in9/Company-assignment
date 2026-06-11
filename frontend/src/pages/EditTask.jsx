import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    useDispatch
} from "react-redux";

import {
    updateTask
} from "../redux/taskSlice";

import {
    useState
} from "react";

const EditTask = () => {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

    const dispatch =
        useDispatch();

    const [formData,
        setFormData] =
        useState({
            title: "",
            description: "",
            status: "Pending"
        });

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            await dispatch(
                updateTask({
                    id,
                    taskData:
                        formData
                })
            );

            navigate("/tasks");
        };

    return (
        <div className="max-w-lg mx-auto mt-10">

            <form
                onSubmit={
                    handleSubmit
                }
                className="bg-white p-5 rounded shadow"
            >

                <input
                    className="border p-2 w-full mb-3"
                    placeholder="Title"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value
                        })
                    }
                />

                <textarea
                    className="border p-2 w-full mb-3"
                    placeholder="Description"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value
                        })
                    }
                />

                <select
                    className="border p-2 w-full mb-3"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            status: e.target.value
                        })
                    }
                >
                    <option>
                        Pending
                    </option>

                    <option>
                        Completed
                    </option>

                </select>

                <button
                    className="bg-green-600 text-white px-4 py-2"
                >
                    Update
                </button>

            </form>

        </div>
    );
};

export default EditTask;