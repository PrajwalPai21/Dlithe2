import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const API_KEY = "f604d8a09cd9b354d86a3975cfb8b735";
const API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;


function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <>
    <header>
        <h1 style={{color:"red", textAlign:"center"}}>Snooze Bros</h1>
    </header>
    <div>
      <h1>The Most Famous movies of all Time</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ margin: "10px" }}>
            <Link to={`/movie/${movie.id}`}>
              <img 
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={movie.title} 
              />
            </Link>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
    <footer style={{textAlign:"center"}}>
        Copyright @Prajwal Pai 2025
    </footer>
    </>
  );
}

export default Home;