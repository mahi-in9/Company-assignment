import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import TaskList from "../pages/TaskList";
import CreateTask from "../pages/CreateTask";
import EditTask from "../pages/EditTask";

import AdminDashboard from "../pages/AdminDashboard";
import UserManagement from "../pages/UserManagement";
import TaskMonitoring from "../pages/TaskMonitoring";
import ActivityLogs from "../pages/ActivityLogs";

import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from "../components/AdminRoute";

const AppRoutes = () => {
    return (
        <Routes>

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tasks"
                element={
                    <ProtectedRoute>
                        <TaskList />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tasks/create"
                element={
                    <ProtectedRoute>
                        <CreateTask />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/tasks/edit/:id"
                element={
                    <ProtectedRoute>
                        <EditTask />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <AdminRoute>
                        <UserManagement />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/tasks"
                element={
                    <AdminRoute>
                        <TaskMonitoring />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/logs"
                element={
                    <AdminRoute>
                        <ActivityLogs />
                    </AdminRoute>
                }
            />

        </Routes>
    );
};

export default AppRoutes;