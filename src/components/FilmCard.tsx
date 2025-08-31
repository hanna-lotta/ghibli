import { useState } from "react";
import type { ApiData } from "../data/types";
import { useFavoriteStore } from "../store/favoriteStore";


const FilmCard = ({ film, image } : { film: ApiData; image: string }) => {
	const favorites = useFavoriteStore(state => state.favorites);
	const addFavorite = useFavoriteStore(state => state.addFavorite);
	const removeFavorite = useFavoriteStore(state => state.removeFavorite);
	const isFavorited = favorites.some(f => f.id === film.id);

const handleFavorite = () => {
    if (isFavorited) {
		removeFavorite(film.id)
	} else {
		addFavorite(film)
	}
};


  return (
    <div className="film-card">
      <img src={image} alt={film.title} style={{ maxWidth: '200px', width: '100%', marginBottom: '1rem' }} />
      <h2>{film.title}</h2>
      <button onClick={handleFavorite}>
        {isFavorited ? "❤️" : "🤍"}
      </button>
      <p>{film.description}</p>
      <p><strong>Director:</strong> {film.director}</p>
      <p><strong>Producer:</strong> {film.producer}</p>
      <p><strong>Release Date:</strong> {film.release_date}</p>
      <p><strong>Running Time:</strong> {film.running_time}</p>
      <p><strong>RT Score:</strong> {film.rt_score}</p>
    </div>
  );
};

export default FilmCard;