import React from "react";
import { useNavigate } from "react-router-dom";
import "./MovieDetails.css";
import { FavoriteMovie } from "../FavoriteMovie/FavoriteMovie";

export function MovieDetails({ movie }) {
  const navigate = useNavigate();
  if (!movie) {
    return (
      <div>
        <h1>Movie Not Found</h1>
      </div>
    );
  }

  const { title, release_date, poster_path, overview, id } = movie;

  return (
    <div className="movieContainer">
      <button className="goBackBtn" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <h1 className="title">{title}</h1>
      <div className="detailsContainer">
        <img
          className="img"
          alt={title}
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        />

        <FavoriteMovie movieId={id} />

        <p>{release_date}</p>
      </div>
      <div className="description">
        <p>{overview}</p>
      </div>
    </div>
  );
}
