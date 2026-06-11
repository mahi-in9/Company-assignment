import {
    Link
} from "react-router-dom";

import {
    useDispatch,
    useSelector
} from "react-redux";

import { logout }
    from "../redux/authSlice";

const Navbar = () => {
    const dispatch =
        useDispatch();

    const { user } =
        useSelector(
            (state) =>
                state.auth
        );

    return (
        <nav className="bg-white shadow px-5 py-4 flex justify-between">
            <Link to="/">
                Task Manager
            </Link>

            <div className="flex gap-4">
                {user?.role ===
                    "Admin" && (
                        <>
                            <Link
                                to="/admin"
                            >
                                Admin
                            </Link>

                            <Link
                                to="/users"
                            >
                                Users
                            </Link>
                        </>
                    )}

                <button
                    onClick={() =>
                        dispatch(
                            logout()
                        )
                    }
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;