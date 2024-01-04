import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logOutHandler = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully !");
    navigate("/");
  };

  return (
    <div className="header">
      <Link to="/" className="heading">
        Your Contacts
      </Link>

      {auth.user ? (
        <nav className="navBar">
          <ul className="navList">
            <li>
              <button className="logoutBtn" onClick={logOutHandler}>
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="navBar">
          <ul className="navList">
            <li>
              <NavLink to="/signup" className="navLinks">
                SignUp
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className="navLinks">
                LogIn
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="navLinks">
                Dashboard
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <ToastContainer />
    </div>
  );
};

export default Header;
