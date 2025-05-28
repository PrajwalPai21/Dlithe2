import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function LoggedInInfo() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    window.location.reload(); 
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
