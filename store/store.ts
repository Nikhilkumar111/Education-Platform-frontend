import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/auth/authSlice";
import { authApi } from "./api/auth/authApi";
import studentReducer from "./feature/student/studentSlice"
import { studentApi } from "./api/student/studentApi";

import walletReducer from "./feature/wallet/walletSlice";
import { walletApi } from "./api/wallet/walletApi";
import teacherReducer from "./feature/teacher/teacherSlice"
import {teacherApi} from "./api/teacher/teacherApi"
import { subscriptionApi } from "./api/subscription/subscriptionApi";





export const store = configureStore({
  reducer: {
    // RTK Query APIs
    auth:authReducer,
    student:studentReducer,
    wallet:walletReducer,
    teacher:teacherReducer,


    [authApi.reducerPath]: authApi.reducer,
    [studentApi.reducerPath]:studentApi.reducer,
    [walletApi.reducerPath]:walletApi.reducer,
    [teacherApi.reducerPath]:teacherApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,




//     [studentApi.reducerPath]: studentApi.reducer,
//     [teacherApi.reducerPath]: teacherApi.reducer,


  },

  middleware: (getDefault) =>
    getDefault().concat(
      authApi.middleware,
      studentApi.middleware,
      walletApi.middleware,
      teacherApi.middleware,
      subscriptionApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
