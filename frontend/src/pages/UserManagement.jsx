import {
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";


import Table from "../components/Table";

import {
    fetchUsers,
    deleteUser,
    updateUserStatus
} from "../redux/adminSlice";

const UserManagement = () => {

    const dispatch =
        useDispatch();

    const {
        users
    } = useSelector(
        state =>
            state.admin
    );

    useEffect(() => {
        dispatch(
            fetchUsers()
        );
    }, []);

    return (
        <div className="p-5">

            <h2 className="text-2xl mb-4">
                Users
            </h2>

            <Table
                headers={[
                    "Name",
                    "Email",
                    "Role",
                    "Status",
                    "Action"
                ]}
            >

                {users.map(user => (

                    <tr key={user._id}>

                        <td className="border p-2">
                            {user.name}
                        </td>

                        <td className="border p-2">
                            {user.email}
                        </td>

                        <td className="border p-2">
                            {user.role}
                        </td>

                        <td className="border p-2">

                            <select
                                value={user.status}
                                onChange={(e) =>
                                    dispatch(
                                        updateUserStatus({
                                            id: user._id,
                                            status: e.target.value
                                        })
                                    )
                                }
                                className="border p-1 rounded"
                            >
                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>

                            </select>

                        </td>

                        <td className="border p-2">

                            <button
                                onClick={() =>
                                    dispatch(
                                        deleteUser(
                                            user._id
                                        )
                                    )
                                }
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))}

            </Table>

        </div>
    );
};

export default UserManagement;