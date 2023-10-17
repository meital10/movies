import React, { useState, useEffect } from "react";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

export function FavoriteMovie({ movieId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    setIsFavorite(storedFavorites.includes(movieId));
  }, [movieId]);

  function toggleFavorite(e) {
    e.stopPropagation();
    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteMovies")) || [];

    if (isFavorite) {
      const updatedFavorites = storedFavorites.filter((id) => id !== movieId);

      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    } else {
      storedFavorites.push(movieId);
      localStorage.setItem("favoriteMovies", JSON.stringify(storedFavorites));
    }

    setIsFavorite(!isFavorite);
    navigate(-1);
  }

  return (
    <div>
      <button onClick={toggleFavorite}>
        {isFavorite ? <FcLike size={30} /> : <FcLikePlaceholder size={30} />}
      </button>
    </div>
  );
}
