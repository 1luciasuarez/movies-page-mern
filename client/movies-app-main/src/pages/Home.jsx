import { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from '../components/Pagination';
import Navbar from '../components/Navbar';
import { getMoviesFetch } from '../components/api/getMoviesFetch';

const Home = () => {
  const [data, setData] = useState({ items: [], page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getMoviesFetch(page, 12);
      setData(res);
      setError(null);
    } catch (e) {
      setError('No se pudieron cargar las películas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(1); }, []);

  return (
    <>
      <Navbar />
      <div className="container text-center d-flex flex-column align-items-center">
        <Pagination
          page={data.page}
          pages={data.pages}
          onPrev={() => load(Math.max(1, data.page - 1))}
          onNext={() => load(Math.min(data.pages, data.page + 1))}
        />
        {loading && <p className="mt-3">Cargando...</p>}
        {error && <p className="text-danger mt-3">{error}</p>}
        <div className="d-flex gap-3 flex-wrap justify-content-center pb-5 mt-3">
          {data.items.map((m) => <MovieCard key={m._id} movie={m} />)}
          {!loading && data.items.length === 0 && <p>No hay películas para mostrar.</p>}
        </div>
      </div>
    </>
  );
};
const load = async (page = 1) => {
  try {
    setError(null);
    setLoading(true);
    const res = await getMoviesFetch(page, 12);

    const items = Array.isArray(res) ? res : res.items ?? [];
    const pageNum = Array.isArray(res) ? 1 : res.page ?? 1;
    const pages = Array.isArray(res) ? 1 : res.pages ?? 1;
    const total = Array.isArray(res) ? res.length : res.total ?? items.length;

    setData({ items, page: pageNum, pages, total, limit: 12 });
  } catch (e) {
    console.error('Error cargando películas:', e);
    setError('No se pudieron cargar las películas');
  } finally {
    setLoading(false);
  }
};

export default Home;
