import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration Successful!");
    navigate("/login");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 border rounded shadow bg-light" style={{ width: "300px" }}>
            <h2 className="text-center">Register</h2>
            <Form>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </Form.Group>
              <Button className="mt-3 w-100" variant="primary" onClick={handleRegister}>
                Register
              </Button>
            </Form>
          </div>
    </Container>
  );
}

export default Register;
