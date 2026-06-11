import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../api/axios";

export const fetchTasks =
    createAsyncThunk(
        "tasks/fetchTasks",
        async () => {
            const response =
                await api.get("/tasks");

            return response.data.data;
        }
    );

export const createTask =
    createAsyncThunk(
        "tasks/createTask",
        async (taskData) => {
            const response =
                await api.post(
                    "/tasks",
                    taskData
                );

            return response.data.data;
        }
    );

export const deleteTask =
    createAsyncThunk(
        "tasks/deleteTask",
        async (id) => {
            await api.delete(
                `/tasks/${id}`
            );

            return id;
        }
    );

export const updateTask =
    createAsyncThunk(
        "tasks/updateTask",
        async ({
            id,
            taskData
        }) => {

            const response =
                await api.put(
                    `/tasks/${id}`,
                    taskData
                );

            return response.data.data;
        }
    );

const taskSlice =
    createSlice({
        name: "tasks",

        initialState: {
            tasks: [],
            loading: false,
            error: null
        },

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchTasks.pending,
                    (state) => {
                        state.loading = true;
                    }
                )

                .addCase(
                    fetchTasks.fulfilled,
                    (state, action) => {
                        state.loading = false;
                        state.tasks = action.payload;
                    }
                )

                .addCase(
                    createTask.fulfilled,
                    (state, action) => {
                        state.tasks.push(
                            action.payload
                        );
                    }
                )

                .addCase(
                    deleteTask.fulfilled,
                    (state, action) => {
                        state.tasks =
                            state.tasks.filter(
                                task =>
                                    task._id !== action.payload
                            );
                    }
                )

                .addCase(
                    updateTask.fulfilled,
                    (state, action) => {

                        state.tasks =
                            state.tasks.map(
                                task =>

                                    task._id ===
                                        action.payload._id

                                        ? action.payload

                                        : task
                            );
                    }
                )

        }
    });

export default taskSlice.reducer;