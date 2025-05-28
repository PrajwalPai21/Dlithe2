import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  ListGroup,
  InputGroup,
} from "react-bootstrap";

function UserPlaylists() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPlaylist, setNewPlaylist] = useState({ name: "", public: true });

  const fetchPlaylists = () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setPlaylists([]);
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/api/playlists/user/${email}`)
      .then((res) => {
        setPlaylists(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching playlists:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");
    try {
      await axios.post("http://localhost:8080/api/playlists/create", {
        ...newPlaylist,
        userEmail: email,
      });
      setNewPlaylist({ name: "", public: true });
      fetchPlaylists();
    } catch (err) {
      console.error("Error creating playlist:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/playlists/${id}`);
      fetchPlaylists();
    } catch (err) {
      console.error("Error deleting playlist:", err);
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/playlists/${id}`, {
        name: newName,
      });
      setEditingId(null);
      setNewName("");
      fetchPlaylists();
    } catch (err) {
      console.error("Error updating playlist name:", err);
    }
  };

  if (loading) return <p>Loading playlists...</p>;

  return (
    <Card className="shadow-sm mt-4 p-4">
      <h4 className="mb-3">🎵 Your Playlists</h4>

      {/* 🎷 Create New Playlist Form */}
      <Form className="mb-4" onSubmit={handleCreate}>
        <Row className="g-2 align-items-center">
          <Col sm>
            <Form.Control
              type="text"
              placeholder="Playlist name"
              value={newPlaylist.name}
              onChange={(e) =>
                setNewPlaylist({ ...newPlaylist, name: e.target.value })
              }
              required
            />
          </Col>
          <Col sm="auto">
            <Form.Select
              value={newPlaylist.public}
              onChange={(e) =>
                setNewPlaylist({
                  ...newPlaylist,
                  public: e.target.value === "true",
                })
              }
            >
              <option value="true">Public</option>
              <option value="false">Private</option>
            </Form.Select>
          </Col>
          <Col sm="auto">
            <Button type="submit" variant="primary">
              Add Playlist
            </Button>
          </Col>
        </Row>
      </Form>

      {/* 📋 Playlist List */}
      {playlists.length === 0 ? (
        <p className="text-muted">No playlists found.</p>
      ) : (
        <ListGroup>
          {playlists.map((playlist) => (
            <ListGroup.Item
              key={playlist.id}
              className="d-flex justify-content-between align-items-center"
            >
              {editingId === playlist.id ? (
                <>
                  <InputGroup className="me-2">
                    <Form.Control
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </InputGroup>
                  <div className="d-flex">
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(playlist.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <span>{playlist.name}</span>
                  <div>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setEditingId(playlist.id);
                        setNewName(playlist.name);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(playlist.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Card>
  );
}

export default UserPlaylists;
