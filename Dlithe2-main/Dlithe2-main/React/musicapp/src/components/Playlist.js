import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Playlist = ({ songs, setCurrentSongIndex }) => {
  return (
    <div className="playlist mt-4">
      <h4>Playlist</h4>
      <ul className="list-group">
        {songs.map((song, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            {song}
            <button className="btn btn-sm btn-primary" onClick={() => setCurrentSongIndex(index)}>
              Play
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
