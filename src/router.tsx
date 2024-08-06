import { createBrowserRouter } from 'react-router-dom';
import SignIn from './modules/auth/SignIn';
import SignUp from './modules/auth/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Library from './modules/Library';
import Discovery from './modules/Discovery';
import VerifySteam from './modules/VerifySteam';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Library />
      </ProtectedRoute>
    ),
  },
  {
    path: '/discovery',
    element: (
      <ProtectedRoute>
        <Discovery />
      </ProtectedRoute>
    ),
  },
  {
    path: '/verify',
    element: <VerifySteam />,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: '',
        element: <SignIn />,
      },
      {
        path: '*',
        element: <SignIn />,
      },
    ],
  },
]);
