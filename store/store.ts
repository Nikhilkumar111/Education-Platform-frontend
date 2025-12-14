import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";
import { authApi } from "./api/auth/authApi";
import studentReducer from "./feature/student/studentSlice"
import { studentApi } from "./api/student/studentApi";

import walletReducer from "./feature/wallet/walletSlice";
import { walletApi } from "./api/wallet/walletApi";


export const store = configureStore({
  reducer: {
    // RTK Query APIs
    auth:authReducer,
    student:studentReducer,
    wallet:walletReducer,

    [authApi.reducerPath]: authApi.reducer,
    [studentApi.reducerPath]:studentApi.reducer,
    [walletApi.reducerPath]:walletApi.reducer
//     [studentApi.reducerPath]: studentApi.reducer,
//     [teacherApi.reducerPath]: teacherApi.reducer,


  },

  middleware: (getDefault) =>
    getDefault().concat(
      authApi.middleware,
      studentApi.middleware,
      walletApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
