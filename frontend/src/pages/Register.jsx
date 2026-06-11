import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
            role: "User"
        });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result =
            await dispatch(
                registerUser(formData)
            );

        if (
            result.meta.requestStatus ===
            "fulfilled"
        ) {
            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-96"
            >

                <h2 className="text-2xl mb-4">
                    Register
                </h2>

                <input
                    name="name"
                    placeholder="Name"
                    className="border w-full p-2 mb-3"
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    className="border w-full p-2 mb-3"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border w-full p-2 mb-3"
                    onChange={handleChange}
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="border w-full p-2 mb-3"
                >
                    <option value="User">
                        User
                    </option>

                    <option value="Admin">
                        Admin
                    </option>
                </select>

                <button
                    className="bg-green-600 text-white w-full p-2"
                >
                    Register
                </button>

                <Link
                    to="/login"
                    className="block text-center mt-3"
                >
                    Already have account?
                </Link>

            </form>
        </div>
    );
};

export default Register;