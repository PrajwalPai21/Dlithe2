import { useEffect, useState } from "react";
import axios from "axios";
import "./main.css"; 

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); 

  useEffect(() => {
    const API_KEY = "f604d8a09cd9b354d86a3975cfb8b735"; 
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

    axios.get(URL)
      .then(response => setMovies(response.data.results))
      .catch(error => console.error("Error fetching movies:", error));
  }, [page]); 

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>SnoozeBros - Popular Movies</h1>
      <input
        type="text"
        placeholder="Search movies..."
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredMovies.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="movies-container">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img 
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                alt={movie.title} 
              />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default HomePage;
