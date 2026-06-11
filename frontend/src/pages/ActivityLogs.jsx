import {
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchActivityLogs
} from "../redux/adminSlice";

import Table from "../components/Table";

const ActivityLogs = () => {

    const dispatch =
        useDispatch();

    const {
        activityLogs
    } = useSelector(
        state =>
            state.admin
    );

    useEffect(() => {
        dispatch(
            fetchActivityLogs()
        );
    }, []);

    return (
        <div className="p-5">

            <h2 className="text-2xl mb-4">
                Activity Logs
            </h2>

            <Table
                headers={[
                    "User",
                    "Action",
                    "Description",
                    "Timestamp"
                ]}
            >

                {activityLogs.map(log => (

                    <tr key={log._id}>

                        <td className="border p-2">
                            {log.user?.name}
                        </td>

                        <td className="border p-2">
                            {log.action}
                        </td>

                        <td className="border p-2">
                            {log.description}
                        </td>

                        <td className="border p-2">
                            {
                                new Date(
                                    log.timestamp
                                ).toLocaleString()
                            }
                        </td>

                    </tr>

                ))}

            </Table>

        </div>
    );
};

export default ActivityLogs;