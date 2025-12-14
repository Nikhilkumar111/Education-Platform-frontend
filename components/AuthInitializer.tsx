"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/feature/auth/authSlice";

const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("authUser");
    const token = localStorage.getItem("authToken");

    if (user && token) {
      dispatch(
        setCredentials({
          user: JSON.parse(user),
          token,
        })
      );
    }
  }, [dispatch]);

  return null;
};

export default AuthInitializer;
