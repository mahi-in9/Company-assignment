import { useState }
    from "react";

import { useDispatch }
    from "react-redux";

import {
    createTask
}
    from "../redux/taskSlice";

import { useNavigate }
    from "react-router-dom";

const CreateTask = () => {

    const navigate =
        useNavigate();

    const dispatch =
        useDispatch();

    const [formData,
        setFormData] =
        useState({
            title: "",
            description: ""
        });

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            await dispatch(
                createTask(
                    formData
                )
            );

            navigate("/tasks");
        };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-5 rounded shadow">

            <h2 className="text-2xl mb-4">
                Create Task
            </h2>

            <form
                onSubmit={
                    handleSubmit
                }
            >

                <input
                    placeholder="Title"
                    className="w-full border p-2 mb-3"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value
                        })
                    }
                />

                <textarea
                    placeholder="Description"
                    className="w-full border p-2 mb-3"
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            description: e.target.value
                        })
                    }
                />

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Create
                </button>

            </form>

        </div>
    );
};

export default CreateTask;