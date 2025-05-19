
import React, { useState, useEffect } from 'react';
2
function MusicPlayer() {
  const [song, setSong] = useState(""); // Initially empty
  const [songs, setSongs] = useState([]); // To store the list of songs fetched from the backend

  useEffect(() => {
    fetch("http://localhost:8080/music/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data)) // Set the list of songs
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  const handleChange = (e) => {
    setSong(e.target.value);
  };

  return (
    <div>
      <h2>Now Playing: {song || "Select a song"}</h2>
      {song && (
        <audio key={song} controls>
          <source src={`http://localhost:8080/music/${song}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}

      <br />
      <label>Choose a song: </label>
      <select onChange={handleChange}>
        <option value="">Select a song</option>
        {songs.map((songName, index) => (
          <option key={index} value={songName}>
            {songName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MusicPlayer;
