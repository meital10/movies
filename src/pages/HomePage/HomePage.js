import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./HomePage.css";
import { MovieCard } from "../../components/MovieCard/MovieCard";

export function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState(false);
  const [error, setError] = useState(null);

  const totalPagesRef = useRef();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
      )
      .then((response) => {
        if (!totalPagesRef.current) {
          totalPagesRef.current = response.data.total_pages;
        }

        setPopularMovies(response.data.results);
      })
      .catch((error) => {
        setError(
          `An error occurred in fetching popular movies: ${error.message}`
        );
      });
  }, [currentPage]);

  function nowPlaying() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing/?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setFilteredMovies(response.data.results);
        setFavorites(true);
      });
  }

  function filterByPopularity() {
    setFavorites(false);
  }

  function displayFavorites() {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    const favoriteMovies = popularMovies.filter((movie) =>
      storedFavorites.includes(movie.id)
    );
    setFilteredMovies(favoriteMovies);
    setFavorites(true);
  }

  function goToPage(pageNumber) {
    if (pageNumber >= 1 || pageNumber <= totalPagesRef) {
      setCurrentPage(pageNumber);
    }
  }

  //  The render is based on the favorites for now. filteredMovies state is for both: now playing and favoriets.
  //  One better option could be to have one state (moviesToRender) that is changing depending on api calls.
  const moviesToRender = favorites ? filteredMovies : popularMovies;

  return (
    <div className="homeContainer">
      <h1>Popular Movies</h1>
      <div className="buttonContainer">
        <div className="filterButtons">
          <button className="filterBtn" onClick={filterByPopularity}>
            Filter By Popularity
          </button>
          <button className="filterBtn" onClick={nowPlaying}>
            Now Playing
          </button>
          <button className="filterBtn" onClick={displayFavorites}>
            My Favorites
          </button>
        </div>
        <div className="paginationButtons">
          <button
            className="paginationBtn"
            onClick={() => goToPage(currentPage + 1)}
          >
            NEXT PAGE
          </button>
          <button
            className="paginationBtn"
            onClick={() => goToPage(currentPage - 1)}
          >
            PREVIOUS PAGE
          </button>
        </div>
      </div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="cardContainer">
          {moviesToRender.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              date={movie.release_date}
              img={movie.poster_path}
              movieId={movie.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
