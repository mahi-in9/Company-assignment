import {
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchAnalytics
} from "../redux/adminSlice";

import Sidebar from "../components/Sidebar";

import AnalyticsCard from "../components/AnalyticsCard";

const AdminDashboard = () => {

    const dispatch =
        useDispatch();

    const {
        analytics
    } = useSelector(
        state =>
            state.admin
    );

    useEffect(() => {
        dispatch(
            fetchAnalytics()
        );
    }, []);

    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-5">

                <h1 className="text-3xl font-bold mb-5">
                    Analytics Dashboard
                </h1>

                <div className="grid md:grid-cols-4 gap-4">

                    <AnalyticsCard
                        title="Total Users"
                        value={
                            analytics.totalUsers
                        }
                    />

                    <AnalyticsCard
                        title="Total Tasks"
                        value={
                            analytics.totalTasks
                        }
                    />

                    <AnalyticsCard
                        title="Completed Tasks"
                        value={
                            analytics.completedTasks
                        }
                    />

                    <AnalyticsCard
                        title="Pending Tasks"
                        value={
                            analytics.pendingTasks
                        }
                    />

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;