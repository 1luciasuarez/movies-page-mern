import { Link } from 'react-router-dom';


const MovieCard = ({ movie }) => {
  const imgSrc = movie?.image ? `http://localhost:3977/${movie.image}` : 'https://via.placeholder.com/400x600?text=No+Image';
  return (
    <Link to={`/${movie._id}`} className="text-decoration-none">
      <div className="card shadow-sm" style={{ width: '200px' }}>
        <img src={imgSrc} alt={movie.title} style={{ width: '200px', height: '300px', objectFit: 'cover' }} />
        <div className="card-body">
          <h6 className="card-title text-dark mb-0">{movie.title}</h6>
          <small className="text-muted">{movie.releaseYear || ''}</small>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
