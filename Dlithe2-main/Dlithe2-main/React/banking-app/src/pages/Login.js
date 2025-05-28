import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function Login() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      credentials.username === savedUser.username &&
      credentials.password === savedUser.password
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 border rounded shadow bg-light" style={{ width: "300px" }}>
        <h2 className="text-center">Login</h2>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </Form.Group>
          <Button className="mt-3 w-100" variant="success" onClick={handleLogin}>
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Login;
