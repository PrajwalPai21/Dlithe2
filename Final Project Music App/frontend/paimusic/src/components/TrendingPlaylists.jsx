import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup, Badge, Spinner, Alert } from "react-bootstrap";

// Accept alienMode and alienify from props
const TrendingPlaylists = ({ alienMode, alienify }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  useEffect(() => {
    // Fetch trending playlists
    axios
      .get("http://localhost:8080/api/playlists/trending")  // This URL can be stored in a config file or environment variable
      .then((res) => {
        setPlaylists(res.data);
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching trending playlists:", err);
        setError("Failed to load trending playlists. Please try again later.");
        setLoading(false);  // Set loading to false even if there is an error
      });
  }, []);

  // If still loading, show a loading spinner
  if (loading) {
    return (
      <Card className="shadow-sm mt-4 p-4">
        <Card.Header as="h4">
          {alienMode ? alienify("Trending Playlists") : "Trending Playlists"}
        </Card.Header>
        <Card.Body className="text-center">
          <Spinner animation="border" variant="primary" />
        </Card.Body>
      </Card>
    );
  }

  // If there was an error, show an error message
  if (error) {
    return (
      <Card className="shadow-sm mt-4 p-4">
        <Card.Header as="h4">
          {alienMode ? alienify("Trending Playlists") : "Trending Playlists"}
        </Card.Header>
        <Card.Body>
          <Alert variant="danger">{alienMode ? alienify(error) : error}</Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm mt-4 p-4">
      <Card.Header as="h4">
        {alienMode ? alienify("Trending Playlists") : "Trending Playlists"}
      </Card.Header>
      <Card.Body>
        {playlists.length === 0 ? (
          <p className="text-muted">
            {alienMode
              ? alienify("No trending playlists available.")
              : "No trending playlists available."}
          </p>
        ) : (
          <ListGroup variant="flush">
            {playlists.map((playlist) => (
              <ListGroup.Item
                key={playlist.id}
                className="d-flex justify-content-between align-items-center"
              >
                <span>
                  {alienMode ? alienify(playlist.name) : playlist.name}
                </span>
                <Badge pill bg={playlist.isPublic ? "success" : "secondary"}>
                  {alienMode
                    ? alienify(playlist.isPublic ? "Public" : "Private")
                    : playlist.isPublic
                    ? "Public"
                    : "Private"}
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
