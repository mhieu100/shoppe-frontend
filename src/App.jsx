import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './components/share/not.found';
import DashboardPage from './page/admin/dashboard';
import LoginPage from './page/auth/login';
import RegisterPage from './page/auth/register';
import HomePage from './page/seller/home';
import LayoutClient from './components/layout/client.layout';
import LayoutAdmin from './components/layout/admin.layout';

const App = () => {


  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <LayoutClient />
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
      ],
    },

    {
      path: '/admin',
      element: (
        <LayoutAdmin />
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },

    {
      path: '/register',
      element: <RegisterPage />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App