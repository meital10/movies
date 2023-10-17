import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetails } from "../../components/MovieDetails/MovieDetails";
import axios from "axios";

export function MovieDetailsPage() {
  const [movie, setMovies] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        setError(
          `An error occurred in fetching movie details: ${error.message}`
        );
      });
  }, [id]);

  return (
    <div className="container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <MovieDetails movie={movie} />
      )}
    </div>
  );
}
