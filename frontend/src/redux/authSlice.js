import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import api from "../api/axios";

export const registerUser =
    createAsyncThunk(
        "auth/register",
        async (userData, thunkAPI) => {
            try {
                const response =
                    await api.post(
                        "/auth/register",
                        userData
                    );

                return response.data;
            } catch (error) {
                return thunkAPI.rejectWithValue(
                    error.response.data.message
                );
            }
        }
    );

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const response = await api.post(
                "/auth/login",
                userData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message
            );
        }
    }
);
const authSlice =
    createSlice({
        name: "auth",

        initialState: {
            user: JSON.parse(
                localStorage.getItem("user")
            ) || null,

            token: localStorage.getItem("token") || null,

            loading: false,
            error: null
        },

        reducers: {
            logout: (state) => {
                state.user = null;
                state.token = null;

                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        },

        extraReducers: (
            builder
        ) => {
            builder

                .addCase(
                    loginUser.pending,
                    (state) => {
                        state.loading = true;
                    }
                )

                .addCase(
                    loginUser.fulfilled,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.user =
                            action.payload.user;

                        state.token =
                            action.payload.token;
                    }
                )

                .addCase(
                    loginUser.rejected,
                    (
                        state,
                        action
                    ) => {
                        state.loading =
                            false;

                        state.error =
                            action.error.message;
                    }
                );
        }
    });

export const {
    logout
} = authSlice.actions;

export default authSlice.reducer;