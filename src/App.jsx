import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './components/share/not.found';
import DashboardPage from './page/admin/dashboard';
import LoginPage from './page/auth/login';
import RegisterPage from './page/auth/register';
import HomePage from './page/seller/index';
import LayoutClient from './components/layout/client.layout';
import LayoutAdmin from './components/layout/admin.layout';
import UserPage from './page/admin/user';
import CategoryPage from './page/admin/category';
import LayoutSeller from './components/layout/seller.layout';
import ProductPage from './page/seller/product';
import ReviewPage from './page/seller/review';
import OrderPage from './page/seller/order';
import DiscountPage from './page/seller/discount';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutClient />,
      errorElement: <NotFound />,
      children: [{ index: true, element: <HomePage /> }],
    },

    {
      path: '/admin',
      element: <LayoutAdmin />,
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
        },
      ],
    },
    {
      path: '/seller',
      element: <LayoutSeller />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'product',
          element: <ProductPage />,
        },
        {
          path: 'review',
          element: <ReviewPage />,
        },
        {
          path: 'order',
          element: <OrderPage />,
        },
        {
          path: 'discount',
          element: <DiscountPage />,
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

  return <RouterProvider router={router} />;
};

export default App;
