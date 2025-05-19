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

// Accept alienMode and alienify as props
function UserPlaylists({ alienMode, alienify }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPlaylist, setNewPlaylist] = useState({ name: "", public: true });
  const [error, setError] = useState(null);

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
        setError("Failed to fetch playlists. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("userEmail");
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/playlists/create", {
        ...newPlaylist,
        userEmail: email,
      });
      setNewPlaylist({ name: "", public: true });
      fetchPlaylists();
    } catch (err) {
      console.error("Error creating playlist:", err);
      setError("Failed to create playlist. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/playlists/${id}`);
      fetchPlaylists();
    } catch (err) {
      console.error("Error deleting playlist:", err);
      setError("Failed to delete playlist. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/playlists/${id}`, {
        name: newName,
      });
      setEditingId(null);
      setNewName("");
      fetchPlaylists();
    } catch (err) {
      console.error("Error updating playlist name:", err);
      setError("Failed to update playlist name. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading playlists...</p>;

  return (
    <Card className="shadow-sm mt-4 p-4">
      <h4 className="mb-3">
        {alienMode ? alienify("🎵 Your Playlists") : "🎵 Your Playlists"}
      </h4>

      {/* 🎷 Create New Playlist Form */}
      <Form className="mb-4" onSubmit={handleCreate}>
        <Row className="g-2 align-items-center">
          <Col sm>
            <Form.Control
              type="text"
              placeholder={alienMode ? alienify("Playlist name") : "Playlist name"}
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
              <option value="true">
                {alienMode ? alienify("Public") : "Public"}
              </option>
              <option value="false">
                {alienMode ? alienify("Private") : "Private"}
              </option>
            </Form.Select>
          </Col>
          <Col sm="auto">
            <Button type="submit" variant="primary">
              {alienMode ? alienify("Add Playlist") : "Add Playlist"}
            </Button>
          </Col>
        </Row>
      </Form>

      {/* 📋 Playlist List */}
      {error && <div className="alert alert-danger">{error}</div>}

      {playlists.length === 0 ? (
        <p className="text-muted">
          {alienMode ? alienify("No playlists found.") : "No playlists found."}
        </p>
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
                      {alienMode ? alienify("Save") : "Save"}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditingId(null)}
                    >
                      {alienMode ? alienify("Cancel") : "Cancel"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <span>
                    {alienMode ? alienify(playlist.name) : playlist.name}
                  </span>
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
                      {alienMode ? alienify("Edit") : "Edit"}
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(playlist.id)}
                    >
                      {alienMode ? alienify("Delete") : "Delete"}
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
