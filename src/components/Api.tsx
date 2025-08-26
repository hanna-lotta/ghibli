import { useState } from "react";
import { fetchData } from "../data/ghibliApi"
import type { ApiData, Callback } from "../data/types"
import FilmCard from "./FilmCard";

const imageUrls: string[] = [
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0zArXTnzlyTqh6WFCvmyjQE2kcSlBYgbf8znX_lwmrgipNXiXZ4l&usqp=CAE&s", // Castle in the Sky,
	"data:image/jpeg;base64,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", // Grave of the Fireflies
	"https://image.tmdb.org/t/p/original/iJmlng5vOjZpvufejs1AqgS7XZc.jpg", //My Neighbor Totoro
	"https://www.tallengestore.com/cdn/shop/products/KikisDeliveryService-StudioGhibli-JapanaeseAnimatedMoviePoster_f2c01750-fab7-48c1-a5c8-90a501bf3641.jpg?v=1691816704", // Kiki's Delivery Service
	"https://i.redd.it/u7r062zs8vx71.jpg", // Only Yesterday
	"https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/2880808/5960615/MOVAB53745__17006.1679603845.jpg?c=2", // Porco Rosso
	"https://m.media-amazon.com/images/I/71szEG7mfHL._UF1000,1000_QL80_.jpg", //Pom Poko
	"https://m.media-amazon.com/images/I/91K9DUwnZVL.jpg", // Whisper of the Heart
	"https://m.media-amazon.com/images/I/81jSJRqb9IL.jpg", // Princess Mononoke
	"https://resizing.flixster.com/OAq3ZTsXBzdtoh-_7HMq7hCXED8=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10098132_v_v10_ab.jpg", // My Neighbors the Yamadas
	"https://cdn.amightygirl.com/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/4/1/41joy_rrchl_1_.jpg", // Spirited Away
	"https://resizing.flixster.com/eNcxbbFFPyfkZXrRCJEgwbVP004=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQ3MjYzNGI2LTYxYzItNGM5YS04YjAyLTU5YTRjYWJlYjQwZC5qcGc=", // The Cat Returns
	"https://preview.redd.it/official-poster-for-20th-anniversary-re-release-of-hayao-v0-ics4m7zf10od1.jpeg?auto=webp&s=d02ddab73342b1e52788866e98fe9365b88a0dc7", // Howl's Moving Castle
	"https://artofthemovies.co.uk/cdn/shop/products/TalesfromEarthsea-OriginalMoviePoster-01-251952.jpg?v=1660273323", // Tales from Earthsea
	"https://i.ebayimg.com/images/g/otsAAOSwvZtmaYqH/s-l1200.jpg", // Ponyo
	"https://media.posterlounge.com/img/products/720000/716038/716038_poster.jpg", // Arrietty
	"https://resizing.flixster.com/POoimkBxEKNi3LCtxsQyn-E6Kxg=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8822358_v_v10_ab.jpg", // From Up on Poppy Hill
	"https://i.pinimg.com/736x/96/f2/03/96f2033ac8850577419c34088f93557f.jpg", // The Wind Rises
	"https://media.mycomicshop.com/n_iv/600/7237859.jpg", // The Tale of the Princess Kaguya
	"https://bigscreenautographs.com/wp-content/uploads/2022/04/usdssssssssss-1.jpg?v=1651223784", // When Marnie Was There
	"https://i.pinimg.com/564x/50/f4/06/50f4067acb8a30ba0ca78613867d6907.jpg", // The Red Turtle
	"https://s3.antoineonline.com/catalog/product/9/7/9780008475239_3_01_2.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700", // Earwig and the Witch

];

const Api: React.FC = () => {
	const [data, setData] = useState<ApiData[]>([]);

	const handleClick: Callback = async () => {
		const apiData: ApiData[] = await fetchData();
		setData(apiData);
	};

	return (
		<div className="Api">
			<button onClick={handleClick}>Fetch Ghibli Data</button>
			<div className="film-grid">
				{data.map((film, idx) => (
					<FilmCard key={film.id} film={film} idx={idx} image={imageUrls[idx]} />
				))}
			</div>
			{/* {data.length > 0 && (
				<div>
					{data.map((film, idx) => (
						<div key={film.id} style={{marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem'}}>
							<h2>{film.title}</h2>
							{film.title === "Castle in the Sky" && idx === 0 && (
								<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0zArXTnzlyTqh6WFCvmyjQE2kcSlBYgbf8znX_lwmrgipNXiXZ4l&usqp=CAE&s" alt="Castle in the Sky" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Grave of the Fireflies" && idx === 1 && (
								<img src="data:image/jpeg;base64,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" alt="Grave of the Fireflies" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "My Neighbor Totoro" && idx === 2 && (
								<img src="https://image.tmdb.org/t/p/original/iJmlng5vOjZpvufejs1AqgS7XZc.jpg" alt="My Neighbor Totoro" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Kiki's Delivery Service" && idx === 3 && (
								<img src="https://www.tallengestore.com/cdn/shop/products/KikisDeliveryService-StudioGhibli-JapanaeseAnimatedMoviePoster_f2c01750-fab7-48c1-a5c8-90a501bf3641.jpg?v=1691816704" alt="Kiki's Delivery Service" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Only Yesterday" && idx === 4 && (
								<img src="https://i.redd.it/u7r062zs8vx71.jpg" alt="Only Yesterday" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Porco Rosso" && idx === 5 && (
								<img src="https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/2880808/5960615/MOVAB53745__17006.1679603845.jpg?c=2" alt="Porco Rosso" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Pom Poko" && idx === 6 && (
								<img src="https://m.media-amazon.com/images/I/71szEG7mfHL._UF1000,1000_QL80_.jpg" alt="Pom Poko" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Whisper of the Heart" && idx === 7 && (
								<img src="https://m.media-amazon.com/images/I/91K9DUwnZVL.jpg" alt="Whisper of the Heart" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Princess Mononoke" && idx === 8 && (
								<img src="https://m.media-amazon.com/images/I/81jSJRqb9IL.jpg" alt="Princess Mononoke" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "My Neighbors the Yamadas" && idx === 9 && (
								<img src="https://resizing.flixster.com/OAq3ZTsXBzdtoh-_7HMq7hCXED8=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10098132_v_v10_ab.jpg" alt="My Neighbors the Yamadas" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Spirited Away" && idx === 10 && (
								<img src="https://cdn.amightygirl.com/catalog/product/cache/1/image/600x/9df78eab33525d08d6e5fb8d27136e95/4/1/41joy_rrchl_1_.jpg" alt="Spirited Away" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "The Cat Returns" && idx === 11 && (
								<img src="https://resizing.flixster.com/eNcxbbFFPyfkZXrRCJEgwbVP004=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzQ3MjYzNGI2LTYxYzItNGM5YS04YjAyLTU5YTRjYWJlYjQwZC5qcGc=" alt="The Cat Returns" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Howl's Moving Castle" && idx === 12 && (
								<img src="https://preview.redd.it/official-poster-for-20th-anniversary-re-release-of-hayao-v0-ics4m7zf10od1.jpeg?auto=webp&s=d02ddab73342b1e52788866e98fe9365b88a0dc7" alt="Howl's Moving Castle" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Tales from Earthsea" && idx === 13 && (
								<img src="https://artofthemovies.co.uk/cdn/shop/products/TalesfromEarthsea-OriginalMoviePoster-01-251952.jpg?v=1660273323" alt="Tales from Earthsea" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Ponyo" && idx === 14 && (
								<img src="https://i.ebayimg.com/images/g/otsAAOSwvZtmaYqH/s-l1200.jpg" alt="Ponyo" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Arrietty" && idx === 15 && (
								<img src="https://media.posterlounge.com/img/products/720000/716038/716038_poster.jpg" alt="Arrietty" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "From Up on Poppy Hill" && idx === 16 && (
								<img src="https://resizing.flixster.com/POoimkBxEKNi3LCtxsQyn-E6Kxg=/fit-in/705x460/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8822358_v_v10_ab.jpg" alt="From Up on Poppy Hill" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "The Wind Rises" && idx === 17 && (
								<img src="https://i.pinimg.com/736x/96/f2/03/96f2033ac8850577419c34088f93557f.jpg" alt="The Wind Rises" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "The Tale of the Princess Kaguya" && idx === 18 && (
								<img src="https://media.mycomicshop.com/n_iv/600/7237859.jpg" alt="The Tale of the Princess Kaguya" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "When Marnie Was There" && idx === 19 && (
								<img src="https://bigscreenautographs.com/wp-content/uploads/2022/04/usdssssssssss-1.jpg?v=1651223784" alt="When Marnie Was There" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "The Red Turtle" && idx === 20 && (
								<img src="https://i.pinimg.com/564x/50/f4/06/50f4067acb8a30ba0ca78613867d6907.jpg" alt="The Red Turtle" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							{film.title === "Earwig and the Witch" && idx === 21 && (
								<img src="https://s3.antoineonline.com/catalog/product/9/7/9780008475239_3_01_2.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700" alt="Earwig and the Witch" style={{maxWidth: '200px', width: '100%', marginBottom: '1rem'}} />
							)}
							<p>{film.description}</p>
							<p><strong>Director:</strong> {film.director}</p>
							<p><strong>Producer:</strong> {film.producer}</p>
							<p><strong>Release Date:</strong> {film.release_date}</p>
							<p><strong>Running Time:</strong> {film.running_time}</p>
							<p><strong>RT Score:</strong> {film.rt_score}</p>
						</div>
					))}
				</div>
			)} */}
		</div>
	);
};

export default Api;
