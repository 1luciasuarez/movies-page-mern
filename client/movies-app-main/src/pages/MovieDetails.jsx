import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMovieFetch } from '../components/api/getMoviesFetch';
import Navbar from '../components/Navbar';




const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getMovieFetch(id);
        setMovie(data);
      } catch (e) {
        setError('No se pudo cargar la película');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const imgSrc = movie?.image ? `http://localhost:3977/${movie.image}` : 'https://via.placeholder.com/400x600?text=No+Image';

  return (
    <>
      <Navbar />
      <div className="container py-4">
        <Link to="/" className="btn btn-secondary mb-3">← Volver</Link>
        {loading && <p>Cargando...</p>}
        {error && <p className="text-danger">{error}</p>}
        {movie && (
          <div className="d-flex flex-column flex-md-row gap-3">
            <img src={imgSrc} alt={movie.title} style={{ width: '300px', height: '450px', objectFit: 'cover' }} />
            <div>
              <h2>{movie.title}</h2>
              {movie.description && <p className="text-secondary">{movie.description}</p>}
              <p><strong>Año:</strong> {movie.releaseYear || '—'}</p>
              <p><strong>Director:</strong> {movie.director || '—'}</p>
              <p><strong>Actores:</strong> {movie.actors || '—'}</p>
              <p><strong>Género:</strong> {movie.genre || '—'}</p>
              <p><strong>Rating:</strong> {movie.rating ?? '—'}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetails;
