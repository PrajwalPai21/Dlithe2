import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Alert,
  Button,
  Form,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("id");

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/users")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setError("Failed to fetch users from backend.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search filter
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  // Delete user
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${userId}`);
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Failed to delete user.");
      }
    }
  };

  // Sort users
  const handleSort = (key) => {
    const sorted = [...filteredUsers].sort((a, b) =>
      a[key].localeCompare(b[key])
    );
    setFilteredUsers(sorted);
    setSortBy(key);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center text-danger mb-4">Admin Dashboard</h2>
      <p className="text-center">
        Welcome, Admin! You can manage users, playlists, and more here.
      </p>

      {error && <Alert variant="danger">{error}</Alert>}

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          variant="outline-secondary"
          onClick={() => setSearchTerm("")}
        >
          Clear
        </Button>
      </InputGroup>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
        </div>
      ) : filteredUsers.length === 0 ? (
        <Alert variant="info">No users found.</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("username")}
              >
                User Name {sortBy === "username" && "↓"}
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => handleSort("email")}
              >
                Email {sortBy === "email" && "↓"}
              </th>
              <th>Password</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.createdAt}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminDashboard;
