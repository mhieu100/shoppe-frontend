import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NotFound from './components/share/not.found';
import DashboardPage from './page/admin/dashboard';
import LoginPage from './page/auth/login';
import RegisterPage from './page/auth/register';
import HomePage from './page/customer/home';
import LayoutAdmin from './components/layout/layout.admin';
import UserPage from './page/admin/user';
import CategoryPage from './page/admin/category';
import LayoutSeller from './components/layout/layout.seller';
import ProductPage from './page/seller/product';
import ReviewPage from './page/seller/review';
import OrderPage from './page/seller/order';
import DiscountPage from './page/seller/discount';
import LayoutClient from './components/layout/layout.client';
import SellerBoard from './page/seller/index';
import ShopPage from './page/customer/shop';
import CartPage from './page/customer/cart';
import ProductDetail from './page/customer/product.detail';
import Payment from './page/customer/payment';

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
        { index: true, element: <SellerBoard /> },
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
      path: '/',
      element: <LayoutClient />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'shop', element: <ShopPage /> },
        { path: 'cart' , element: <CartPage /> },
        { path: 'product/:id', element: <ProductDetail /> },
        { path: 'payment', element: <Payment /> },
       
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
