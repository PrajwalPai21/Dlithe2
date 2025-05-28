import React, { useEffect, useState } from "react";
import { Container, Table, Alert } from "react-bootstrap";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users from backend.");
      });
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center text-danger mb-4">Admin Dashboard</h2>
      <p className="text-center">
        Welcome, Admin! You can manage users, playlists, and more here.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      {users.length === 0 && !error ? (
        <Alert variant="info">No users found.</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminDashboard;
