import React, { useState } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        name,
        email,
      });

      setMessage("User updated successfully!");
      console.log(response.data);
    } catch (error) {
      setMessage("Failed to update user.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update User</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="New Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className="form-control mb-2"
        placeholder="New Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update User
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default UpdateUser;
