import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getMeFetch } from '../api/getMeFetch';
import 'bootstrap/dist/css/bootstrap.min.css';

function initialsFrom(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'U';
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : '';
  return (first + last).toUpperCase();
}

export default function Profile() {
  const { token, logout } = useAuth();
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getMeFetch(token);
        setMe(data);
      } catch (e) {
        setError('No pudimos cargar tu perfil');
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  if (loading) return <div className="container py-5">Cargando…</div>;
  if (error)   return <div className="container py-5 text-danger">{error}</div>;
  if (!me)     return null;

  const fullName =
    [me.firstname, me.lastname].filter(Boolean).join(' ') ||
    (me.email ? me.email.split('@')[0] : 'Usuario');

  const joinedDate = me.createdAt
    ? new Date(me.createdAt).toLocaleDateString()
    : null;

  const avatarUrl = me.avatar || me.image || null; // por si algún día guardás avatar
  const initials = initialsFrom(fullName);

  return (
    <div className="container py-4">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 720 }}>
        <div className="card-body">
          <div className="d-flex align-items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl.startsWith('http') ? avatarUrl : `http://localhost:3977/${avatarUrl}`}
                alt={fullName}
                className="rounded-circle border"
                style={{ width: 96, height: 96, objectFit: 'cover' }}
                onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=128`; }}
              />
            ) : (
              <div
                className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                style={{ width: 96, height: 96, fontSize: 32 }}
                aria-label="Avatar"
              >
                {initials}
              </div>
            )}

            <div className="flex-grow-1">
              <h3 className="mb-1">{fullName}</h3>
              {me.email && <div className="text-muted">{me.email}</div>}
              <div className="mt-2 d-flex flex-wrap gap-2">
                {me.role && <span className="badge text-bg-primary">Rol: {me.role}</span>}
                {typeof me.active === 'boolean' && (
                  <span className={`badge ${me.active ? 'text-bg-success' : 'text-bg-secondary'}`}>
                    {me.active ? 'Activo' : 'Inactivo'}
                  </span>
                )}
                {joinedDate && <span className="badge text-bg-light">Desde: {joinedDate}</span>}
              </div>
            </div>

            <button className="btn btn-outline-danger" onClick={logout}>Salir</button>
          </div>

          <hr className="my-4" />

          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <div className="fw-semibold mb-1">Nombre</div>
                <div className="text-muted">{me.firstname || '—'}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <div className="fw-semibold mb-1">Apellido</div>
                <div className="text-muted">{me.lastname || '—'}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <div className="fw-semibold mb-1">Email</div>
                <div className="text-muted">{me.email || '—'}</div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="p-3 bg-light rounded">
                <div className="fw-semibold mb-1">ID</div>
                <div className="text-muted">{me._id || '—'}</div>
              </div>
            </div>
          </div>

          {/* Zona para acciones futuras (cambiar contraseña, subir avatar, etc.) */}
          {/* <div className="mt-4">
            <button className="btn btn-primary">Editar perfil</button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
