import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../api/axios";

export const fetchUsers =
    createAsyncThunk(
        "admin/fetchUsers",
        async () => {
            const response =
                await api.get(
                    "/admin/users"
                );

            return response.data.data;
        }
    );

export const fetchAnalytics =
    createAsyncThunk(
        "admin/fetchAnalytics",
        async () => {
            const response =
                await api.get(
                    "/admin/analytics"
                );

            return response.data.data;
        }
    );

export const fetchActivityLogs =
    createAsyncThunk(
        "admin/fetchActivityLogs",
        async () => {
            const response =
                await api.get(
                    "/admin/activity-logs"
                );

            return response.data.data;
        }
    );

export const fetchAllTasks =
    createAsyncThunk(
        "admin/fetchTasks",
        async () => {
            const response =
                await api.get(
                    "/admin/tasks"
                );

            return response.data.data;
        }
    );

export const deleteUser =
    createAsyncThunk(
        "admin/deleteUser",
        async (id) => {
            await api.delete(
                `/admin/users/${id}`
            );

            return id;
        }
    );

export const updateUserStatus =
    createAsyncThunk(
        "admin/updateStatus",

        async ({
            id,
            status
        }) => {

            const response =
                await api.patch(
                    `/admin/users/${id}/status`,
                    { status }
                );

            return response.data.data;
        }
    );


const adminSlice =
    createSlice({
        name: "admin",

        initialState: {
            users: [],
            tasks: [],
            activityLogs: [],
            analytics: {},
            loading: false,
            error: null
        },

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchUsers.fulfilled,
                    (state, action) => {
                        state.users =
                            action.payload;
                    }
                )

                .addCase(
                    fetchAnalytics.fulfilled,
                    (state, action) => {
                        state.analytics =
                            action.payload;
                    }
                )

                .addCase(
                    fetchAllTasks.fulfilled,
                    (state, action) => {
                        state.tasks =
                            action.payload;
                    }
                )

                .addCase(
                    fetchActivityLogs.fulfilled,
                    (state, action) => {
                        state.activityLogs =
                            action.payload;
                    }
                )

                .addCase(
                    deleteUser.fulfilled,
                    (state, action) => {
                        state.users =
                            state.users.filter(
                                user =>
                                    user._id !== action.payload
                            );
                    }
                )
                .addCase(
                    updateUserStatus.fulfilled,
                    (state, action) => {

                        state.users =
                            state.users.map(
                                user =>

                                    user._id ===
                                        action.payload._id

                                        ? action.payload

                                        : user
                            );
                    }
                )
        }
    });

export default adminSlice.reducer;