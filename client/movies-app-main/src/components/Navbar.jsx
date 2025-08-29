import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-dark">
      <nav className="navbar navbar-dark container d-flex justify-content-between">
        <h3 className="navbar-brand text-uppercase mb-0"><Link to="/" className="text-decoration-none text-light">Movies App</Link></h3>
        <div className="d-flex gap-2">
          {token ? (
            <>
              <Link to="/profile" className="btn btn-outline-light btn-sm">{user?.firstname || 'Mi perfil'}</Link>
              <button onClick={handleLogout} className="btn btn-warning btn-sm">Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Registro</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
