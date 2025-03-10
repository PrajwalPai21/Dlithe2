import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "YOUR_TMDB_API_KEY";
const API_URL = "https://api.themoviedb.org/3/movie/";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}${id}?api_key=${API_KEY}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Error fetching movie details:", error));
  }, [id]);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
      />
      <p>{movie.overview}</p>
      <h3>Rating: {movie.vote_average}</h3>
    </div>
  );
}

export default MovieDetail;
