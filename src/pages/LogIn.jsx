import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Enter all the fields");
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      if (data.error) {
        return toast.error(data.error);
      }
      toast.success("User Login Successfully");
      setAuth({
        ...auth,
        user: data.user,
        token: data.token,
      });
      localStorage.setItem("auth", JSON.stringify(data));
      navigate("/");
      toast.success("Signed In successfully");
    } catch (error) {
      toast.error("Can't connect to backend");
    }
  };

  return (
    <Layout>
      <form className="authForm" onSubmit={submitHandler}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your phone"
        />
        <button className="submitBtn" type="submit">
          Log In
        </button>
      </form>
      <ToastContainer />
    </Layout>
  );
};

export default LogIn;
