import { useParams } from "react-router-dom";
import { useFilmStore } from "../store/filmStore";
import { imageUrls } from "../data/imgUrls";

const FilmDetail: React.FC = () => {
	const { id } = useParams();
	const film = useFilmStore(state => state.films.find(f => f.id === id));

	if (!film) {
		return <div>Film hittades inte.</div>;
	}

	return (
		<div className="film-detail">
			<h2>{film.title}</h2>
			<img src={imageUrls[film.id]} alt={film.title} />
			<p>{film.description}</p>
		</div>
	);
};

export default FilmDetail;