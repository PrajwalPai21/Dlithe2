import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Playlist from "./components/Playlist";

function App() {
  const songs = ["song1.mp3", "song2.mp3", "song3.mp3"];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(songs[currentSongIndex]));

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    let newIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
    audioRef.current.pause();
    audioRef.current = new Audio(songs[newIndex]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="container text-center mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-3">🎵 Simple Music Player</h2>
        <p className="lead">Now Playing: <strong>{songs[currentSongIndex]}</strong></p>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={playPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button className="btn btn-success" onClick={nextSong}>Next</button>
        </div>
        <Playlist songs={songs} setCurrentSongIndex={setCurrentSongIndex} />
      </div>
    </div>
  );
}

export default App;

