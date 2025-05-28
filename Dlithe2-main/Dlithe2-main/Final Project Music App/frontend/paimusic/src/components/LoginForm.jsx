import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Button, Alert, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState("info");
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Admin login check
    if (email === "admin" && password === "admin") {
      try {
        await axios.post("http://localhost:8080/api/admin/login", {
          username: email,
          password: password,
        });
        setMessage("Admin login successful.");
        setMessageVariant("success");
        setLoading(false);
        navigate("/admin-dashboard");
      } catch (err) {
        setMessage("Admin login failed.");
        setMessageVariant("danger");
        setLoading(false);
      }
      return;
    }

    // Regular user login
    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("userEmail", email);
      onLogin(email);
      setMessage(res.data);
      setMessageVariant("success");
      setLoading(false);
      navigate("/user-dashboard");
    } catch (err) {
      setMessage(err.response ? err.response.data : "Login failed.");
      setMessageVariant("danger");
      setLoading(false);
    }
  };

  // Simulate forgot password submit
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotMessage("");
    setForgotLoading(true);

    // Simulate API delay
    setTimeout(() => {
      setForgotLoading(false);
      setForgotMessage(
        `If an account with email "${forgotEmail}" exists, a reset link has been sent.`
      );
      setForgotEmail("");
    }, 1500);
  };

  return (
    <>
      <Card className="shadow-sm p-4" style={{ maxWidth: "400px", margin: "auto" }}>
        <Card.Body>
          <h3 className="mb-4 text-center">Welcome Back!</h3>
          <p className="text-center text-muted mb-4">
            Please enter your credentials to login.
          </p>

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email / Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                minLength={3}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={4}
              />
            </Form.Group>

            <div className="mb-3 text-end">
              <Button
                variant="link"
                className="p-0"
                style={{ fontSize: "0.9rem" }}
                onClick={() => setShowForgotModal(true)}
              >
                Forgot password?
              </Button>
            </div>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>

          {message && (
            <Alert variant={messageVariant} className="mt-3 text-center">
              {message}
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* Forgot Password Modal */}
      <Modal
        show={showForgotModal}
        onHide={() => {
          setShowForgotModal(false);
          setForgotMessage("");
          setForgotEmail("");
          setForgotLoading(false);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleForgotSubmit}>
            <Form.Group controlId="forgotEmail">
              <Form.Label>Enter your email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="you@example.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mt-3 w-100"
              disabled={forgotLoading}
            >
              {forgotLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </Form>

          {forgotMessage && (
            <Alert variant="info" className="mt-3">
              {forgotMessage}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginForm;
