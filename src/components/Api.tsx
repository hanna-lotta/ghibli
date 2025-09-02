import { useState, useEffect } from "react";
import { useFilmStore } from "../store/filmStore";
import { fetchData } from "../data/ghibliApi"
import type { ApiData } from "../data/types"
import FilmCard from "./FilmCard";
import { Link } from "react-router-dom";
import { imageUrls } from "../data/imgUrls";


const Api: React.FC = () => {
	const films = useFilmStore(state => state.films);
	const setFilms = useFilmStore(state => state.setFilms);
	const [searchTitle, setSearchTitle] = useState<string>("");

	useEffect(() => {
		const fetchFilms = async () => {
			const apiData: ApiData[] = await fetchData();
			setFilms(apiData);
		};
		fetchFilms();
	}, [setFilms]);

	const filteredFilmData = films.filter(film => film.title.toLowerCase().includes(searchTitle.toLowerCase()));

	return (
		<div className="Api">
			<input
				type="text"
				placeholder="Sök efter filmtitel"
				value={searchTitle}
				onChange={e => setSearchTitle(e.target.value)}
			/>
			<div className="film-grid">
				{filteredFilmData.map((film) => (
					<div key={film.id}>
						<FilmCard film={film} image={imageUrls[film.id]} />
						<div>
							<Link to={`/film/${film.id}`}>
								<button>View Details</button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Api;
