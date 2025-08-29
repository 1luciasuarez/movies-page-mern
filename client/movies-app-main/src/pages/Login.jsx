import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginFetch } from '../api/loginFetch';
import { getMeFetch } from '../api/getMeFetch';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await loginFetch({ email, password });
      let me = null;
      try { me = await getMeFetch(token); } catch {}
      login(token, me);
      navigate('/');
    } catch (err) {
      setError(err?.msg || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 420 }}>
      <h3 className="mb-3">Iniciar sesión</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
      </form>
      <p className="mt-3">¿No tenés cuenta? <Link to="/register">Registrate</Link></p>
    </div>
  );
};

export default Login;
