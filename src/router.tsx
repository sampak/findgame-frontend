import { createBrowserRouter } from 'react-router-dom';
import SignIn from './modules/auth/SignIn';
import SignUp from './modules/auth/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Discovery from './modules/Discovery';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Discovery />
      </ProtectedRoute>
    ),
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
