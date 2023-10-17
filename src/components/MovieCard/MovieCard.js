import React from "react";
import { useNavigate } from "react-router-dom";
import { FavoriteMovie } from "../FavoriteMovie/FavoriteMovie";
import "./MovieCard.css";

export function MovieCard({ title, date, img, movieId }) {
  const navigate = useNavigate();
  return (
    <div className="card" onClick={() => navigate(`/movie/${movieId}`)}>
      <img alt={title} src={`https://image.tmdb.org/t/p/w500/${img}`} />
      <h2>{title}</h2>
      <p>{date}</p>
      <FavoriteMovie movieId={movieId} />
    </div>
  );
}
