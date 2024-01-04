import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/authContext";

const EditUserModal = ({
  uName,
  uEmail,
  uPhone,
  isOpen,
  onClose,
  callParent,
  id,
}) => {
  const [username, setUsername] = useState(uName);
  const [userEmail, setUserEmail] = useState(uEmail);
  const [userPhone, setUserPhone] = useState(uPhone);

  const [auth] = useAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!username || !userEmail || !userPhone) {
        return toast.error("Enter all details");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/user_list/userListItem/${id}`,
        {
          userName: username,
          userEmail,
          userPhone,
        },
        config
      );
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("UserList Item Updated");
        callParent();
        onClose();
      }
    } catch (error) {
      toast.error("Unable to Connect to Server");
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={submitHandler} className="addUserModalForm">
          <input
            type="text"
            className="addUserModalInput"
            placeholder="Enter the username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="addUserModalInput"
            type="text"
            placeholder="Enter user's email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            className="addUserModalInput"
            type="text"
            placeholder="Enter user's contact"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
          <button type="submit" className="submitBtn">
            Save
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} closeOnClick />
    </div>
  );
};

export default EditUserModal;
