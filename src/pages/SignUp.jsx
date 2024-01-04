import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [hearAbout, setHearAbout] = useState("");
  const [city, setCity] = useState("");
  const [stateLiving, setStateLiving] = useState("");

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !password ||
      !gender ||
      !phone ||
      !city ||
      !stateLiving ||
      !hearAbout
    ) {
      toast.error("Enter all the details");
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/signup`,
        {
          name,
          email,
          password,
          gender,
          phone,
          hear_About: hearAbout,
          city,
          state: stateLiving,
        }
      );
      if (data.error) {
        toast.error(data.error);
      }
      setAuth({
        ...auth,
        user: data.newUser,
        token: data.token,
      });
      localStorage.setItem("auth", JSON.stringify(data));
      navigate("/");
      toast.success("Signed In successfully");
    } catch {
      toast.error("Cannot forward the request");
    }
  };

  return (
    <Layout>
      <form onSubmit={submitHandler} className="authForm">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <label for="city">Choose city: </label>
        <select
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="Mumbai">Mumbai</option>
          <option value="Pune">Pune</option>
          <option value="Ahemabad">Ahemdabad</option>
        </select>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="MALE"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "MALE"}
            />
            <span>MALE</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "FEMALE"}
            />
            <span>FEMALE</span>
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="OTHERS"
              onChange={(e) => setGender(e.target.value)}
              checked={gender === "OTHERS"}
            />
            <span>OTHERS</span>
          </label>
        </div>
        <input
          type="text"
          value={stateLiving}
          onChange={(e) => setStateLiving(e.target.value)}
          placeholder="Enter your state"
        />
        <div>
          <label>
            Where did you hear about us ? <br />
          </label>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Linkedin"
              onChange={(e) => setHearAbout(e.target.value)}
              checked={hearAbout === "Linkedin"}
            />
            <span>LinkedIn</span>
          </label>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Job Portal"
              onChange={(e) => setHearAbout(e.target.value)}
              checked={hearAbout === "Job Portal"}
            />
            <span>Job Portal</span>
          </label>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Friends"
              onChange={(e) => setHearAbout(e.target.value)}
              checked={hearAbout === "Friends"}
            />
            <span>Friends</span>
          </label>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Others"
              onChange={(e) => setHearAbout(e.target.value)}
              checked={hearAbout === "Others"}
            />
            <span>Others</span>
          </label>
        </div>
        <button className="submitBtn" type="submit">
          Sign up
        </button>
      </form>
      <ToastContainer />
    </Layout>
  );
};

export default SignUp;
