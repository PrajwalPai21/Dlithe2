import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup, Badge, Form, OverlayTrigger, Tooltip, Button } from "react-bootstrap";

const TrendingPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [sortByName, setSortByName] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPlaylists = () => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/playlists/trending")
      .then((res) => {
        const publicPlaylists = res.data.filter(
          (p) => p.public === true || p.public === "true"
        );
        setPlaylists(publicPlaylists);
        setError(null);
      })
      .catch((err) => {
        setError("Failed to load playlists. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const displayedPlaylists = sortByName
    ? [...playlists].sort((a, b) => a.name.localeCompare(b.name))
    : playlists;

  return (
    <Card
      className="shadow-sm mt-4 p-4"
      style={{ borderRadius: "12px", backgroundColor: "#f8f9fa" }}
    >
      <Card.Header
        as="h4"
        className="d-flex justify-content-between align-items-center"
        style={{ fontWeight: "700", fontSize: "1.5rem", color: "#343a40" }}
      >
        Trending Playlists
        <div className="d-flex align-items-center gap-3">
          <OverlayTrigger
            placement="left"
            overlay={<Tooltip>Toggle sorting playlists by name alphabetically</Tooltip>}
          >
            <Form.Check
              type="switch"
              id="sort-name-switch"
              label="Sort by Name"
              checked={sortByName}
              onChange={() => setSortByName(!sortByName)}
              style={{ cursor: "pointer" }}
            />
          </OverlayTrigger>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={fetchPlaylists}
            disabled={loading}
            title="Refresh playlists"
          >
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>
      </Card.Header>
      <Card.Body style={{ padding: "1rem 1.5rem" }}>
        {error && (
          <p className="text-danger text-center" style={{ fontWeight: "600" }}>
            {error}
          </p>
        )}
        {!error && displayedPlaylists.length === 0 && (
          <p className="text-muted text-center" style={{ fontStyle: "italic" }}>
            No trending public playlists available.
          </p>
        )}
        {!error && displayedPlaylists.length > 0 && (
          <ListGroup variant="flush">
            {displayedPlaylists.map((playlist) => (
              <ListGroup.Item
                key={playlist.id}
                className="d-flex justify-content-between align-items-center"
                style={{
                  borderRadius: "8px",
                  marginBottom: "8px",
                  transition: "background-color 0.2s ease",
                  cursor: "pointer",
                  padding: "0.75rem 1rem",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e9ecef")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span style={{ fontWeight: "600", color: "#495057" }}>{playlist.name}</span>
                <Badge pill bg="success" style={{ fontSize: "0.8rem", fontWeight: "600" }}>
                  Public
                </Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default TrendingPlaylists;