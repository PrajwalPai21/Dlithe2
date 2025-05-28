import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, ListGroup, Badge } from "react-bootstrap";

const TrendingPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/playlists/trending")
      .then((res) => {
        setPlaylists(res.data);
      })
      .catch((err) => {
        console.error("Error fetching trending playlists:", err);
      });
  }, []);

  return (
    <Card className="shadow-sm mt-4 p-4">
      <Card.Header as="h4">Trending Playlists</Card.Header>
      <Card.Body>
        {playlists.length === 0 ? (
          <p className="text-muted">No trending playlists available.</p>
        ) : (
          <ListGroup variant="flush">
            {playlists.map((playlist) => (
              <ListGroup.Item
                key={playlist.id}
                className="d-flex justify-content-between align-items-center"
              >
                {playlist.name}
                <Badge
                  pill
                  bg={playlist.public ? "success" : "secondary"}
                >
                  {playlist.public ? "Public" : "Private"}
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
