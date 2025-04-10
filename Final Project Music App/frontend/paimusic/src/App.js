import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Card,
  Form,
  InputGroup,
  Table,
  Alert,
  // Row,
  // Col,
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LoggedInInfo from "./components/LoggedInInfo";
import UserPlaylists from "./components/UserPlaylists";
import TrendingPlaylists from "./components/TrendingPlaylists";
import SubscriptionPage from "./components/SubscriptionPage";

function App() {
  const [users, setUsers] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);
  const [showSubscription, setShowSubscription] = useState(false);

  useEffect(() => {
    document.title = "Pai Music";
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setLoggedInEmail(storedEmail);
    }

    axios.get("http://localhost:8080/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error("Failed to fetch users:", err));
  }, []);

  const fetchTracks = (query) => {
    axios.get(`https://spotify23.p.rapidapi.com/search/?q=${query}&type=tracks`, {
      headers: {
        "x-rapidapi-key": "8de4bd6c30msh5d95f4d6af2bd43p1567d7jsn761e11ef30bd",
        "x-rapidapi-host": "spotify23.p.rapidapi.com",
      }
    })
    .then(res => setTracks(res.data.tracks.items))
    .catch(err => console.error("Track search error:", err));
  };

  return (
    <Container className="py-4">
      <header className="text-center mb-5">
        <h1 className="text-success fw-bold">Pai Music</h1>
        <p className="text-muted">Your favorite music, all in one place.</p>
      </header>

      {!loggedInEmail ? (
        <div className="d-flex justify-content-center mb-5">
          <Card style={{ width: "400px" }} className="shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                {isLoginView ? "Login" : "Register"}
              </Card.Title>

              {isLoginView ? (
                <LoginForm onLogin={setLoggedInEmail} />
              ) : (
                <RegisterForm />
              )}

              <div className="text-center mt-4">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => setIsLoginView(!isLoginView)}
                >
                  {isLoginView
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ) : (
        <>
          <div className="text-end mb-4">
            <Button
              variant="outline-primary"
              onClick={() => setShowSubscription(!showSubscription)}
            >
              {showSubscription ? "Back to Dashboard" : "View Subscription Plans"}
            </Button>
          </div>

          {showSubscription ? (
            <SubscriptionPage />
          ) : (
            <>
              <LoggedInInfo email={loggedInEmail} />

              <hr className="my-4" />

              {/* Search Section */}
              <div className="mb-5">
                <h2 className="mb-3">Search Music</h2>
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Search for songs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button onClick={() => fetchTracks(searchQuery)} variant="primary">
                    Search
                  </Button>
                </InputGroup>

                {tracks.length > 0 && (
                  <Card className="shadow-sm">
                    <Card.Body>
                      <Card.Title>Search Results</Card.Title>
                      <ul className="list-group list-group-flush">
                        {tracks.map((track) => (
                          <li key={track.data.id} className="list-group-item">
                            {track.data.name} —{" "}
                            {track.data.artists.items[0].profile.name}
                          </li>
                        ))}
                      </ul>
                    </Card.Body>
                  </Card>
                )}
              </div>

              {/* User Playlists */}
              <UserPlaylists email={loggedInEmail} />
            </>
          )}
        </>
      )}

      {/* Trending Playlists */}
      <TrendingPlaylists />

      {/* Admin User Table */}
      {loggedInEmail && (
        <div className="mt-5">
          <h3>All Users (from Backend)</h3>
          {users.length === 0 ? (
            <Alert variant="info">No users found.</Alert>
          ) : (
            <div className="table-responsive">
              <Table striped bordered hover responsive className="shadow-sm">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

export default App;
