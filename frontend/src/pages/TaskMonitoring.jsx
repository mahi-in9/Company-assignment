import {
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchAllTasks
} from "../redux/adminSlice";

import Table from "../components/Table";

const TaskMonitoring = () => {

    const dispatch =
        useDispatch();

    const {
        tasks
    } = useSelector(
        state =>
            state.admin
    );

    useEffect(() => {
        dispatch(
            fetchAllTasks()
        );
    }, []);

    return (
        <div className="p-5">

            <h2 className="text-2xl mb-4">
                Task Monitoring
            </h2>

            <Table
                headers={[
                    "Title",
                    "User",
                    "Status"
                ]}
            >

                {tasks.map(task => (

                    <tr key={task._id}>

                        <td className="border p-2">
                            {task.title}
                        </td>

                        <td className="border p-2">
                            {task.createdBy?.name}
                        </td>

                        <td className="border p-2">
                            {task.status}
                        </td>

                    </tr>

                ))}

            </Table>

        </div>
    );
};

export default TaskMonitoring;