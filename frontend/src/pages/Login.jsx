
import {
    useState
} from "react";

import {
    useDispatch
} from "react-redux";

import {
    loginUser
} from "../redux/authSlice";

import {
    Link,
    useNavigate
} from "react-router-dom";

const Login = () => {
    const navigate =
        useNavigate();

    const dispatch =
        useDispatch();

    const [formData,
        setFormData] =
        useState({
            email: "",
            password: ""
        });

    const handleChange = (
        e
    ) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(loginUser(formData));

        console.log(res);

        if (
            res.meta.requestStatus ===
            "fulfilled"
        ) navigate("/");
    };

    return (
        <div className="min-h-screen flex justify-center items-center">

            <form
                onSubmit={
                    handleSubmit
                }
                className="bg-white p-6 shadow rounded w-96"
            >
                <h2 className="text-2xl mb-4">
                    Login
                </h2>

                <input
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3"
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-3"
                    onChange={
                        handleChange
                    }
                />

                <button
                    className="w-full bg-blue-600 text-white p-2"
                >
                    Login
                </button>
                <Link
                    to="/register"
                    className="block text-center mt-3"
                >
                    Don't have an account?
                </Link>
            </form>
        </div>
    );
};

export default Login;