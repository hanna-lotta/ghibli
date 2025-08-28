import { useState } from "react";
import { fetchData } from "../data/ghibliApi"
import type { ApiData, Callback } from "../data/types"
import FilmCard from "./FilmCard";
import FilmDetail from "./FilmDetail";
import { imageUrls } from "../data/imgUrls";


const Api: React.FC = () => {
	const [data, setData] = useState<ApiData[]>([]);
	const [selectedFilm, setSelectedFilm] = useState<ApiData | null>(null);
	const [searchTitle, setSearchTitle] = useState<string>("")

	const handleClick: Callback = async () => {
		const apiData: ApiData[] = await fetchData();
		setData(apiData);
	};

	const handleFilmClick = (film: ApiData) => {
		setSelectedFilm(film);
	};

	const filteredData = data.filter(film => film.title.toLowerCase().includes(searchTitle.toLowerCase())
	)

	return (
		<div className="Api">
			<button onClick={handleClick}>Fetch Ghibli Data</button>
			<input type="text" 
			 placeholder="Sök efter filmtitel"
			 value={searchTitle}
			 onChange={e => setSearchTitle (e.target.value)}
			/>
			
			{selectedFilm ? (
				<FilmDetail film={selectedFilm} />
			) : (
				<div className="film-grid">
					{filteredData.map((film, idx) => (
						<div key={film.id}>
							  <FilmCard film={film} idx={idx} image={imageUrls[film.id]} />
							<div>
								<button onClick={() => handleFilmClick(film)}>View Details</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Api;
