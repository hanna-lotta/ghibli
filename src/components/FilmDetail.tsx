import type { ApiData } from "../data/types";
import { imageUrls } from "../data/imgUrls";

const FilmDetail: React.FC<{ film: ApiData }> = ({ film }) => {
	return (
		<div className="film-detail">
			<h2>{film.title}</h2>
			<img src={imageUrls[film.id]} alt={film.title} />
			<p>{film.description}</p>
		</div>
	);
};
export default FilmDetail;