import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './components/share/not.found';
import DashboardPage from './page/admin/dashboard';
import LoginPage from './page/auth/login';
import RegisterPage from './page/auth/register';
import HomePage from './page/seller/home';
import LayoutClient from './components/layout/client.layout';
import LayoutAdmin from './components/layout/admin.layout';
import UserPage from './page/admin/user';
import CategoryPage from './page/admin/category';

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
        {
          path: 'users',
          element: <UserPage />,
        },
        {
          path: 'categories',
          element: <CategoryPage />,
        }
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