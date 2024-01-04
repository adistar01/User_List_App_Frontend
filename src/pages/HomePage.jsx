import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import AddUserModal from "../components/AddUserModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../context/authContext";
import Card from "../components/Card";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [userList, setUserList] = useState([]);

  const [auth] = useAuth();
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);

  const openModal = () => {
    setAddUserModalOpen(true);
  };

  const closeModal = () => {
    setAddUserModalOpen(false);
  };

  const fetchUsers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/user_list/`,
        config
      );
      if (data.error) {
        toast.error(data.error);
      }
      setUserList(data.userList);
      console.log(data);
    } catch (error) {
      toast.error("Can not fetch user list");
    }
  };

  const deleteUser = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/user_list/userListItem/${id}`,
        config
      );
      if (data.error) {
        toast.error(data.error);
      }
      toast.success("List Item deleted");
      fetchUsers();
    } catch (error) {
      toast.error("Can not fetch user list");
    }
  };

  useEffect(() => {
    if (auth.user) {
      fetchUsers();
    }
  }, [auth]);

  return (
    <Layout>
      {auth.user ? (
        <>
          <button className="addUserBtn" onClick={openModal}>
            Add User
          </button>
          <div style={{ display: "flex", flexWrap: "row" }}>
            {userList.map((user) => (
              <Card
                id={user._id}
                key={user._id}
                name={user.userName}
                email={user.userEmail}
                phone={user.userPhone}
                delAction={deleteUser}
                callParent={fetchUsers}
              />
            ))}
            {addUserModalOpen && (
              <AddUserModal
                isOpen={addUserModalOpen}
                onClose={closeModal}
                callParent={fetchUsers}
              />
            )}
          </div>
        </>
      ) : (
        <div>
          <p>You are not logged in</p>
          <p>
            <NavLink to="/signup" className="navLinksHomePage">
              SignUp
            </NavLink>{" "}
            or{" "}
            <NavLink to="/login" className="navLinksHomePage">
              LogIn
            </NavLink>{" "}
            to continue
          </p>
        </div>
      )}

      <ToastContainer />
    </Layout>
  );
};

export default HomePage;
