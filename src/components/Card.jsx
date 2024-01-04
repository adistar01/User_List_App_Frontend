import React, { useState } from "react";
import EditUserModal from "./EditUserModal";

const Card = ({ name, email, phone, id, delAction, callParent }) => {
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);

  const openEditModal = () => {
    setEditUserModalOpen(true);
  };
  const closeEditModal = () => {
    setEditUserModalOpen(false);
  };

  return (
    <div className="card">
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <button
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "2px",
            width: "50%",
            border: "none",
            borderRadius: "1rem",
          }}
          onClick={openEditModal}
        >
          Edit
        </button>
        <button
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "2px",
            width: "50%",
            border: "none",
            borderRadius: "1rem",
          }}
          onClick={() => delAction(id)}
        >
          Delete
        </button>
      </div>
      {editUserModalOpen && (
        <EditUserModal
          isOpen={editUserModalOpen}
          onClose={closeEditModal}
          uName={name}
          uEmail={email}
          uPhone={phone}
          id={id}
          callParent={callParent}
        />
      )}
    </div>
  );
};

export default Card;
