import {
    configureStore
} from "@reduxjs/toolkit";

import authReducer from "../redux/authSlice";
import taskReducer from "../redux/taskSlice";
import adminReducer from "../redux/adminSlice";

export const store =
    configureStore({
        reducer: {
            auth: authReducer,
            tasks: taskReducer,
            admin: adminReducer
        }
    });