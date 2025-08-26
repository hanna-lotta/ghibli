import type { ApiData } from "../data/types";


const FilmCard = ({ film, idx, image }: { film: ApiData; idx: number; image: string }) => {
  return (
    <div className="film-card">
      <img src={image} alt={film.title} style={{ maxWidth: '200px', width: '100%', marginBottom: '1rem' }} />
      <h2>{film.title}</h2>
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