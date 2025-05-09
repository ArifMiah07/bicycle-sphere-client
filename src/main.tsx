import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './layout/MainPage.tsx';
import './index.css';
import Home from './pages/Home/Home.tsx';
import AboutUs from './pages/AboutUs/AboutUs.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import AllBicycles from './pages/AllBicycles/AllBicycles.tsx';
import BicycleDetails from './pages/BicycleDetails/BicycleDetails.tsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.tsx';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import SignIn from './pages/SignIn'; // Import the SignIn component
import UsersManagement from './components/Dashboard/UsersManagement.tsx'; // Import the UsersManagement page
import Checkout from './pages/Checkout/Checkout.tsx';
// import Products from './components/Products/Products.tsx';
import CreateBicycleForm from './components/Products/CreateBicycleForm.tsx';
import UpdateBicycleForm from './components/Products/UpdateBicycleForm.tsx';
import ProductDetails from './components/Products/ProductDetails.tsx';
import Order from './pages/Orders/Orders.tsx';
import Register from './pages/Register.tsx';
import AuthProvider from './context/AuthProvider.tsx';
import { ToastContainer } from 'react-toastify';
import UserDashBoard from './components/Dashboard/UserDashBoard.tsx';
import ProductManagement from './components/Dashboard/ProductManagement.tsx';
import AllOrders from './pages/AllOrders/AllOrders.tsx';
import Admin from './components/Dashboard/Admin.tsx';
import PasswordUpdate from './components/Dashboard/PasswordUpdate.tsx';
import UserDash from './components/Dashboard/UserDash.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/bicycles', element: <AllBicycles /> },
      { path: '/bicycles/:id', element: <BicycleDetails /> },
      {
        path: '/checkout',
        element: (
          <RoleProtectedRoute allowedRoles={['admin', 'customer']}>
            <Checkout />
          </RoleProtectedRoute>
        ),
      },
      {
        path: 'orders',
        element: <Order />,
      },
      { path: '/aboutUs', element: <AboutUs /> },
      { path: '/signUp', element: <Register /> },
      { path: '/signIn', element: <SignIn /> },
      {
        path: '/user',
        element: (
          <RoleProtectedRoute allowedRoles={['customer']}>
            <UserDashBoard />
          </RoleProtectedRoute>
        ),
        children: [
          {
            path: 'orders',
            element: (
              <RoleProtectedRoute allowedRoles={['customer']}>
                <Order />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'udashboard',
            element: (
              <RoleProtectedRoute allowedRoles={['customer']}>
                <UserDash />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'updatePassword',
            element: (
              <RoleProtectedRoute allowedRoles={['customer']}>
                <PasswordUpdate />
              </RoleProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/unauthorized',
        element: <Unauthorized />,
      },
      {
        path: '/admin',
        element: (
          <RoleProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </RoleProtectedRoute>
        ),
        children: [
          {
            path: 'users-management',
            element: (
              <RoleProtectedRoute allowedRoles={['admin']}>
                <UsersManagement />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'dashboard',
            element: (
              <RoleProtectedRoute allowedRoles={['admin']}>
                <Admin />
              </RoleProtectedRoute>
            ),
          },

          {
            path: 'products',
            element: (
              <RoleProtectedRoute allowedRoles={['admin']}>
                <ProductManagement />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'products/add',
            element: (
              <RoleProtectedRoute allowedRoles={['admin']}>
                <CreateBicycleForm />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'products/edit/:id',
            element: (
              <RoleProtectedRoute allowedRoles={['admin']}>
                <UpdateBicycleForm />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'products/details/:id',
            element: (
              <RoleProtectedRoute allowedRoles={['admin']}>
                <ProductDetails />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'users-management',
            element: <UsersManagement />,
          },
          {
            path: 'orders',
            element: <AllOrders />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer />
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
