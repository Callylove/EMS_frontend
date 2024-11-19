
// // import Sidebar from './components/Sidebar.jsx';
// // import Header from './components/Header.jsx';
// // import Footer from './components/Footer.jsx';
// // import { Outlet, useNavigate } from 'react-router-dom';
// // import { FaHouse, FaPowerOff } from 'react-icons/fa6';
// // import { FaUserFriends } from 'react-icons/fa';
// // import { TbCategoryFilled } from 'react-icons/tb';
// // import { MdFileUpload } from "react-icons/md";
// // import { IoPersonSharp } from 'react-icons/io5';
// // import { useEffect, useState } from 'react';
// // import axios from 'axios';
// // // import React from 'react';

// // // const Layout = () => {
// // //   const [sidebarItems, setSidebarItems] = useState([]);
// // //   const navigate = useNavigate();
// // //   // Assume we have a way to get the JWT token from cookies or localStorage
// // //   const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

// // //   useEffect(() => {
// // //     // Check if the token exists, if not redirect to login
// // //     if (!token) {
// // //       navigate('/auth/login');
// // //       return;
// // //     }})
// // //   // // Simulate fetching user role (could come from authentication context, for example)
// // //   // useEffect(() => {
// // //   //   // Assume we fetch the user role or authentication state
// // //   //   // Example: This would likely come from your auth context, API, etc.
// // //   //   axios.get('http://localhost:3000/user/role')
// // //   //     .then(response => {
// // //   //       const role = response.data.role;  // Assume role is "admin" or "user"

// // //   //       // Set sidebar items dynamically based on role
// // //   //       if (role === 'admin') {
// // //   //         setSidebarItems([
// // //   //           { to: '/admin/dashboard', icon: <FaHouse />, label: 'Dashboard' },
// // //   //           { to: '/admin/employees', icon: <FaUserFriends />, label: 'Manage Employees' },
// // //   //           { to: '/admin/category', icon: <TbCategoryFilled />, label: 'Category' },
// // //   //           { to: '/admin/profile', icon: <IoPersonSharp />, label: 'Profile' },
// // //   //           { to: '/admin/logout', icon: <FaPowerOff />, label: 'Logout', onClick: handleLogout }
// // //   //         ]);
// // //   //       } else {
// // //   //         setSidebarItems([
// // //   //           { to: '/user/dashboard', icon: <FaHouse />, label: 'Dashboard' },
// // //   //           { to: '/user/profile', icon: <IoPersonSharp />, label: 'Profile' },
// // //   //           { to: '/user/logout', icon: <FaPowerOff />, label: 'Logout', onClick: handleLogout }
// // //   //         ]);
// // //   //       }})})

// // //           // Handle logout functionality
// // //   // const handleLogout = () => {
// // //   //   axios.get('http://localhost:3000/logout')
// // //   //     .then(res => {
// // //   //       if (res.data.Status) {
// // //   //         navigate('/auth/login');
// // //   //       }
// // //   //     })
// // //   //     .catch(err => console.error('Logout error:', err));
// // //   // };
// // //   // Set the Authorization header with the token to make an authenticated request
// // //   axios.get('http://localhost:3000/user/role', { withCredentials: true })  // withCredentials ensures cookies are sent
// // //   .then(response => {
// // //     const role = response.data.role;

// // //     // Set sidebar items based on user role
// // //     if (role === 'admin') {
// // //       setSidebarItems([
// // //         { to: '/admin/dashboard', icon: <FaHouse />, label: 'Dashboard' },
// // //         { to: '/admin/employees', icon: <FaUserFriends />, label: 'Manage Employees' },
// // //         { to: '/admin/category', icon: <TbCategoryFilled />, label: 'Category' },
// // //         { to: '/admin/profile', icon: <IoPersonSharp />, label: 'Profile' },
// // //         { to: '/admin/logout', icon: <FaPowerOff />, label: 'Logout', onClick: handleLogout }
// // //       ]);
// // //     } else {
// // //       setSidebarItems([
// // //         { to: '/user/dashboard', icon: <FaHouse />, label: 'Dashboard' },
// // //         { to: '/user/profile', icon: <IoPersonSharp />, label: 'Profile' },
// // //         { to: '/user/logout', icon: <FaPowerOff />, label: 'Logout', onClick: handleLogout }
// // //       ]);
// // //     }
// // //   })
// // //   .catch(error => {
// // //     console.error('Error fetching role:', error);
// // //     navigate('/auth/login');  // Redirect to login if there's an error or no role
// // //   });
// // // }, [token, navigate]

// // // const handleLogout = () => {
// // // // Clear the token from cookies and redirect to login
// // // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';  // Delete cookie
// // // navigate('/auth/login');
// // // };

// // //   return (
// // //     <div className="flex flex-col h-screen">
// // //       <div className="flex flex-1">
// // //         {/* Sidebar */}
// // //         {/* <Sidebar /> */}
// // //         <Sidebar items={sidebarItems} />

// // //         <div className="flex-1 flex flex-col">
// // //           {/* Header */}
// // //           <Header />

// // //           {/* Main Content */}
// // //           <main className="flex-1 p-2 md:p-6 bg-gray-100">
// // //             <Outlet /> 
// // //           </main>

// // //           {/* Footer */}
// // //           <Footer />
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // const Layout = () => {
// //   const [sidebarItems, setSidebarItems] = useState([]);
// //   const navigate = useNavigate();
// //   axios.defaults.withCredentials = true
// //   const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
// //   // Handle logout functionality
// //   const handleLogout = () => {

    
// //     axios.get(`${apiUrl}/admin/logout`) // Make sure the request sends credentials
// //       .then(res => {
// //         console.log(res.data);
        
// //         if (res.data.Status) {
// //           // If logout was successful, redirect to the login page
// //           navigate('/auth/login');
// //         } else {
// //           console.error('Logout failed:', res.data);
// //         }
// //       })
// //       .catch(err => {
// //         console.error('Logout error:', err);
// //       });
// //   };
// //   const fetchUserRoleAndSetSidebar = async () => {
// //     try {
// //       const response = await axios.get(`${apiUrl}/auth/dashboard`, { withCredentials: true });
// //       const role = response.data.user?.role;  
// //       console.log('Role:', role);

// //       // Dynamically set sidebar items based on the role
// //       if (role === 'admin') {
// //         setSidebarItems([
// //           { to: '/admin/dashboard', icon: <FaHouse />, label: 'Dashboard' },
// //           { to: '/admin/employees', icon: <FaUserFriends />, label: 'Manage Employees' },
// //           { to: '/admin/category', icon: <TbCategoryFilled />, label: 'Category' },
// //           { to: '/admin/profile', icon: <IoPersonSharp />, label: 'Profile' },
// //           {  icon: <FaPowerOff />, label: 'Logout', onClick: ()=> handleLogout() }
// //         ]);
// //       } else {
// //         setSidebarItems([
// //           { to: '/user/dashboard', icon: <FaHouse />, label: 'Dashboard' },
// //           { to: '/user/update', icon: <MdFileUpload />, label: 'Update Documents' },
// //           { to: '/user/profile', icon: <IoPersonSharp />, label: 'Profile' },

// //           {  icon: <FaPowerOff />, label: 'Logout', onClick: handleLogout }
// //         ]);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching role:', error);
// //       navigate('/auth/login');  
// //     }
// //   };

// //   useEffect(() => {
// //     if (!sidebarItems.length) {
// //       fetchUserRoleAndSetSidebar();
// //     }
// //   }, [sidebarItems]);// Only run the effect when the component mounts or `navigate` changes

// //   return (
// //     <div className="flex flex-col h-screen">
// //       <div className="flex flex-1">
// //         {/* Sidebar */}
// //         <Sidebar items={sidebarItems} />

// //         <div className="flex-1 flex flex-col">
// //           {/* Header */}
// //           <Header />

// //           {/* Main Content */}
// //           <main className="flex-1 p-2 md:p-6 bg-gray-100">
// //             <Outlet />  {/* This renders the content based on the active route */}
// //           </main>

// //           {/* Footer */}
// //           <Footer />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// export default Layout;
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  FaUserFriends, FaPowerOff, FaHouseUser } from 'react-icons/fa';
import { IoPersonSharp } from 'react-icons/io5';
import { MdFileUpload } from 'react-icons/md';
import { TbCategoryFilled } from 'react-icons/tb';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [sidebarItems, setSidebarItems] = useState([]);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

  // Handle logout functionality
  const handleLogout = () => {
    axios.get(`${apiUrl}/admin/logout`, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        if (res.data.Status) {
          navigate('/auth/login');  // Redirect to login on successful logout
        } else {
          console.error('Logout failed:', res.data);
        }
      })
      .catch(err => {
        console.error('Logout error:', err);
      });
  };


  // Fetch user role and set sidebar items based on role
  const fetchUserRoleAndSetSidebar = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/dashboard`, { withCredentials: true });
      const role = response.data.user?.role;
      console.log('Role:', role);

      // Dynamically set sidebar items based on the role
      if (role === 'admin') {
        setSidebarItems([
          { to: '/admin/dashboard', icon: <FaHouseUser />, label: 'Dashboard' },
          { to: '/admin/employees', icon: <FaUserFriends />, label: 'Manage Employees' },
          { to: '/admin/category', icon: <TbCategoryFilled />, label: 'Category' },
          { to: '/admin/profile', icon: <IoPersonSharp />, label: 'Profile' },
          { icon: <FaPowerOff />, label: 'Logout', onClick: handleLogout },
        ]);
      } else {
        setSidebarItems([
          { to: '/user/dashboard', icon: <FaHouseUser />, label: 'Dashboard' },
          { to: '/user/update', icon: <MdFileUpload />, label: 'Update Documents' },
          { to: '/user/profile', icon: <IoPersonSharp />, label: 'Profile' },
          { icon: <FaPowerOff />, label: 'Logout', onClick: handleLogout },
        ]);
      }
    } catch (error) {
      console.error('Error fetching role:', error);
      navigate('/auth/login');  // Redirect to login if there's an error
    }
  };
  
  // // Fetch user role and set sidebar only once when component mounts
  useEffect(  () => {
    fetchUserRoleAndSetSidebar();
  }, []);  // Empty dependency array to run this effect only once on mount
  // useEffect(() => {
  //   // Define an inner async function
  //   const fetchRoleAndSetSidebar = async () => {
  //     try {
  //       await fetchUserRoleAndSetSidebar();
  //     } catch (error) {
  //       console.error("Error in fetching role and setting sidebar:", error);
  //     }
  //   };
  
  //   // Call the inner async function
  //   fetchRoleAndSetSidebar();
  // }, []); // Empty dependency array to run only once on mount
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar items={sidebarItems} />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 p-2 md:p-6 bg-gray-100">
            <Outlet />  {/* This renders the content based on the active route */}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;

// import { useState, useEffect } from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaHouseUser, FaUserFriends, FaPowerOff } from 'react-icons/fa';
// import { IoPersonSharp } from 'react-icons/io5';
// import { MdFileUpload } from 'react-icons/md';
// import { TbCategoryFilled } from 'react-icons/tb';
// import Sidebar from './components/Sidebar.jsx';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// const Layout = () => {
//   const [sidebarItems, setSidebarItems] = useState([]);
//   const [loading, setLoading] = useState(true);  // Add loading state
//   const navigate = useNavigate();
//   const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

//   // Handle logout functionality
//   const handleLogout = () => {
//     axios.get(`${apiUrl}/admin/logout`, { withCredentials: true })
//       .then(res => {
//         console.log(res.data);
//         if (res.data.Status) {
//           navigate('/auth/login');  // Redirect to login on successful logout
//         } else {
//           console.error('Logout failed:', res.data);
//         }
//       })
//       .catch(err => {
//         console.error('Logout error:', err);
//       });
//   };

//   // Fetch user role and set sidebar based on role
//   const fetchUserRoleAndSetSidebar = async () => {
//     try {
//       const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
      
      
//       if (!token) {
//         // If token is not available in cookies, navigate to login
//         navigate('/auth/login');
//         return;
//       }

//       // Proceed to fetch the user role from the backend
//       const response = await axios.get(`${apiUrl}/auth/dashboard`, { withCredentials: true });
//       const role = response.data.user?.role;
//       console.log('Role:', role);

//       // Dynamically set sidebar items based on the role
//       if (role === 'admin') {
//         setSidebarItems([
//           { to: '/admin/dashboard', icon: <FaHouseUser />, label: 'Dashboard' },
//           { to: '/admin/employees', icon: <FaUserFriends />, label: 'Manage Employees' },
//           { to: '/admin/category', icon: <TbCategoryFilled />, label: 'Category' },
//           { to: '/admin/profile', icon: <IoPersonSharp />, label: 'Profile' },
//           { icon: <FaPowerOff />, label: 'Logout', onClick: handleLogout },
//         ]);
//       } else {
//         setSidebarItems([
//           { to: '/user/dashboard', icon: <FaHouseUser />, label: 'Dashboard' },
//           { to: '/user/update', icon: <MdFileUpload />, label: 'Update Documents' },
//           { to: '/user/profile', icon: <IoPersonSharp />, label: 'Profile' },
//           { icon: <FaPowerOff />, label: 'Logout', onClick: handleLogout },
//         ]);
//       }

//       setLoading(false);  // Stop loading once the data is fetched

//     } catch (error) {
//       console.error('Error fetching role:', error);
//       navigate('/auth/login');  // Redirect to login if there's an error
//     }
//   };

//   // Run fetchUserRoleAndSetSidebar only once when component mounts and token is available
//   useEffect(() => {
//     // If there's no token, don't proceed with fetching the role
//     const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));

//     if (token) {
//       fetchUserRoleAndSetSidebar();
//     } else {
//       setLoading(false);  // If there's no token, stop loading
//       navigate('/auth/login');  // Redirect to login
//     }
//   }, []); // Run effect once when the component mounts

//   if (loading) {
//     return <div>Loading...</div>;  // Show loading state until sidebar data is fetched
//   }

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex flex-1">
//         {/* Sidebar */}
//         <Sidebar items={sidebarItems} />

//         <div className="flex-1 flex flex-col">
//           {/* Header */}
//           <Header />

//           {/* Main Content */}
//           <main className="flex-1 p-2 md:p-6 bg-gray-100">
//             <Outlet />  {/* This renders the content based on the active route */}
//           </main>

//           {/* Footer */}
//           <Footer />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
