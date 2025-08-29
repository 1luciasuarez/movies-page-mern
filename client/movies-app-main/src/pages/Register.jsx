import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerFetch } from '../api/registerFetch';

const Register = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setOk(false);
    setLoading(true);
    try {
      await registerFetch({ firstname, lastname, email, password });
      setOk(true);
      setTimeout(()=> navigate('/login'), 800);
    } catch (err) {
      setError(err?.msg || 'Error al registrarte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      <h3 className="mb-3">Crear cuenta</h3>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Nombre</label>
            <input className="form-control" value={firstname} onChange={(e)=>setFirstname(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Apellido</label>
            <input className="form-control" value={lastname} onChange={(e)=>setLastname(e.target.value)} required />
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {ok && <div className="alert alert-success">¡Cuenta creada! Te redirijo al login…</div>}
        <button className="btn btn-primary w-100" disabled={loading}>{loading ? 'Creando…' : 'Registrarme'}</button>
      </form>
      <p className="mt-3">¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
    </div>
  );
};

export default Register;
