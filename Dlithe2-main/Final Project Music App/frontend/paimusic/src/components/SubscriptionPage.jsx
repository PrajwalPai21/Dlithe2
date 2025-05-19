import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
} from "react-bootstrap";

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["Basic music streaming", "Limited skips", "Ads included"],
    highlight: false,
    isCurrent: true,
  },
  {
    name: "Premium",
    price: "$4.99/mo",
    features: ["Ad-free listening", "Unlimited skips", "Offline mode"],
    highlight: true,
    isCurrent: false,
  },
  {
    name: "Pro",
    price: "$9.99/mo",
    features: ["Everything in Premium", "Early access", "Hi-fi audio"],
    highlight: false,
    isCurrent: false,
  },
];

const SubscriptionPage = () => {
  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Choose Your Plan</h2>
      <p className="text-center text-muted mb-5">
        Unlock more features and get the most out of Pai Music.
      </p>

      <Row className="justify-content-center">
        {plans.map((plan, idx) => (
          <Col key={idx} md={4} className="mb-4">
            <Card
              className={`h-100 shadow-sm ${
                plan.highlight ? "border-primary border-2" : ""
              }`}
            >
              <Card.Body className="text-center">
                <Card.Title
                  className={`fw-bold ${plan.highlight ? "text-primary" : ""}`}
                >
                  {plan.name}
                </Card.Title>
                <Card.Subtitle className="my-3 h5">{plan.price}</Card.Subtitle>
                
                <ListGroup variant="flush" className="mb-4">
                  {plan.features.map((feature, i) => (
                    <ListGroup.Item key={i}>✅ {feature}</ListGroup.Item>
                  ))}
                </ListGroup>

                {plan.isCurrent ? (
                  <Button variant="outline-secondary" disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button variant={plan.highlight ? "primary" : "outline-secondary"}>
                    Subscribe
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SubscriptionPage;
