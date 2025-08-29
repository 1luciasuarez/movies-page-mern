import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import MovieDetails from '../pages/MovieDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      { index: true, element: <Home /> },
      { path: '/:id', element: <MovieDetails /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/',
        element: <ProtectedRoute />,
        children: [
          { path: '/profile', element: <Profile /> },
        ]
      }
    ],
  },
]);
