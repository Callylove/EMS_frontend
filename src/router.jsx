// import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
// import Layout from './layout';
import AdminDashboard from './pages/AdminDashboard';  
import Employees from './pages/Employees';
import Profile from './pages/AdminProfile';
import Category from './pages/Category';
import Login from './components/Login';
import AddCategory from './components/AddCategory';
import UserDashboard from './pages/UserDashboard';
import AuthLayout from './Authlayout';
import AddEmployee from './components/AddEmployee';
import Register from './components/Register';
import EditEmployee from './components/EditEmployee';
import EditAdmin from './components/EditAdmin';
import UserProfile from './pages/UserProfile';
// import UpdateUserDashboard from './pages/UserDashboard';
import UpdateDocuments from './pages/UpdateDocuments';
import Adminlayout from './Adminlayout';
import Userlayout from './Userlayout';


const router = createBrowserRouter([
  {
    path: "/admin",
    element: <Adminlayout />,
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "category",
        element: <Category />,
      },
     
      {
        path:'add_category',
        element:<AddCategory/>
      },
      {
        path:'add_employee',
        element:<AddEmployee/>
      },
      {
        path:'edit_employee/:id',
        element:<EditEmployee />
      },
      {
        path:'edit_admin/:id',
        element:<EditAdmin />
      }
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      // Redirect /auth to /auth/login
      {
        index: true, // This will match when the user visits /auth directly
        element: <Navigate to="auth/login" />
      },
      // Define the login and register routes
      {
        path: 'auth/login',
        element: <Login />
      },
      {
        path: 'auth/register',
        element: <Register />
      }
    ]
  },
  {
    path: "/user",
    element: <Userlayout />,
    children: [
      {
        path: "dashboard",
        element: <UserDashboard />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "update",
        element: <UpdateDocuments />,
      },
    
    ],
  },
]);


const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
