import { useEffect, useState } from "react";
import { axiosInstance } from "../config/axios";
import { User } from "../interfaces/user.interface";
import { Routes, Route, Navigate, redirect } from "react-router-dom";
import Album from "./HomePage";
import SignIn from "./SingIn";
import SignUp from "./SingUp";

const Loading = () => {
  const [user, setuser] = useState<User | null>(null);

  const handleGetUserByToken = async (token: string) => {
    try {
      const response = await axiosInstance.get("/v1/auth/get-user-by-token", {
        headers: {
          token,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    handleGetUserByToken(token!)
      .then((data) => {
        if (data) {
          setuser({ ...data });
          // navigate("/main");
          redirect("/main");
          return <Navigate to="/main" replace />;
        } else {
          setuser(null);
        }
      })
      .catch(() => setuser(null));
  }, []);

  useEffect(() => {
    if (user) {
      <Navigate to={"main"} />;
    }
  }, [user]);

  return (
    <>
      <h1>Hola mndo</h1>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/main" element={<Album />} />
      </Routes>
    </>
  );
};

export default Loading;
