


import { useFavoriteStore } from "../store/favoriteStore";

const FavoriteFilms = () => {
	const favorites = useFavoriteStore(state => state.favorites);
	return (
		<div>
			<h2>Favoriter</h2>
			{favorites.length === 0 ? (
				<p>Inga favoriter tillagda än.</p>
			) : (
				<ul>
					{favorites.map(film => (
						<li key={film.id}>{film.title}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default FavoriteFilms;