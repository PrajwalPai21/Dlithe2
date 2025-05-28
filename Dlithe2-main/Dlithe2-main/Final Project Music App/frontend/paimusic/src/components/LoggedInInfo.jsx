import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function LoggedInInfo({ email, setLoggedInEmail, setIsAdmin }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setLoggedInEmail("");
    setIsAdmin(false);
    navigate("/"); // redirect to login page
  };

  if (!email) return null;

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Row className="align-items-center">
          <Col>
            <Card.Title className="mb-1">Logged in as</Card.Title>
            <Card.Text className="text-muted mb-0">{email}</Card.Text>
          </Col>
          <Col xs="auto">
            <Button variant="outline-danger" size="sm" onClick={handleLogout}>
              Log Out
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default LoggedInInfo;
