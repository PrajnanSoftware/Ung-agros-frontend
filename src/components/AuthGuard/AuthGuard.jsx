import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "../../utils/axiosInstance";
import { CircularProgress } from "@mui/material";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Prevents flickering while checking auth

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get("/users/profile");

        if (response.status !== 200) {
          throw new Error("Unauthorized");
        }

        setIsLoading(false); // Authentication successful
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/login"); // Redirect to login if unauthorized
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div style={{ position: "relative" }}>
          <CircularProgress size={80} thickness={4} color="primary" />
          <CircularProgress
            size={60}
            thickness={4}
            color="secondary"
            style={{ position: "absolute", top: 10, left: 10 }}
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGuard;
