// import axios from 'axios'
// import  { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from '../../AuthProvider/useAuth';
// // import React from 'react';
// export default function Login() {
      
//       const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
//       const { login } = useAuth();
//     const navigate = useNavigate()
//     const [errors,setErrors] = useState(null)
//     const [values,setValues] = useState({
//         email:'',
//         password:''
//     })
//     axios.defaults.withCredentials = true
//     const handleSubmit = (e)=> {
      
        
// e.preventDefault()
// axios.post(`${apiUrl}/auth/login`,values)
// .then(res=>{
    
//     if (res.data.loginStatus) {
//       const userRole = res.data.role;
//       login(userRole);  
  
//         // Check user role in the response
//         if (res.data.role === "admin") {
          
            
//           // If the user is an admin, navigate to the admin dashboard
//           navigate("/admin/dashboard");
//         } else if (res.data.role === "user") {
//             navigate("/user/dashboard");
//           }
//       } else {
  
        
//         setErrors(res.data.error)
//         console.log("Login failed");
//         // Optionally show a message for failed login
//       }
//     // if(res.data.loginStatus){
//     //     navigate('/admin-dashboard')
//     // }
// })
// .catch(err=>console.log(err))


//     }
    
//   return (
//     <div className='w-full flex flex-col min-h-screen justify-center items-center '>
       
//         <div className='flex flex-col border rounded shadow  p-6'>
//         <div className='text-red-500 mb-2 '>
//             <p>{errors && errors}</p>
//         </div>
//             <h2 className='text-xl font-bold tracking-medium mb-6 text-center text-green-600'>LOGIN</h2>
//             <form onSubmit={handleSubmit} className='grid grid-rows-2  gap-2' method='POST'>
               
//                     <label htmlFor="email" className='font-normal tracking-medium'>Email</label>
//                     <input type="email" name='email' autoComplete='off' placeholder='Enter Email' className='rounded px-4 h-8  focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50' onChange={(e)=>setValues({...values, email: e.target.value})}/>
              
      
//                     <label htmlFor="password" className='font-normal tracking-medium'>Password</label>
//                     <input type="password" name='password' autoComplete='off' placeholder='Enter Password' className='rounded px-4 h-8  focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50' onChange={(e)=>setValues({...values, password: e.target.value})}/>
//                     <div className="flex gap-4">
//         <p> Don&apos;t have an account?</p>
//         <Link to='/auth/register' className="border-b border-green-600 text-green-600">Register</Link>
//         </div>
//                 <button className='border w-[80px] h-8 self-center justify-self-center mt-6 rounded border-green-600 bg-green-600 text-white hover:bg-green-500'>LOGIN</button>
//             </form>
//         </div>
//     </div>
//   )
// }

import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider/useAuth';

export default function Login() {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); // State to track loading

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted

    axios
      .post(`${apiUrl}/auth/login`, values)
      .then((res) => {
        setLoading(false); // Reset loading state after API response
        if (res.data.loginStatus) {
          const userRole = res.data.role;
          login(userRole);

          // Check user role in the response
          if (res.data.role === 'admin') {
            navigate('/admin/dashboard');
          } else if (res.data.role === 'user') {
            navigate('/user/dashboard');
          }
        } else {
          setErrors(res.data.error);
          console.log('Login failed');
        }
      })
      .catch((err) => {
        setLoading(false); // Reset loading state in case of an error
        console.log(err);
      });
  };

  return (
    <div className="w-full flex flex-col min-h-screen justify-center items-center ">
      <div className="flex flex-col border rounded shadow  p-6">
        <div className="text-red-500 mb-2 ">
          <p>{errors && errors}</p>
        </div>
        <h2 className="text-xl font-bold tracking-medium mb-6 text-center text-green-600">LOGIN</h2>
        <form onSubmit={handleSubmit} className="grid grid-rows-2  gap-2" method="POST">
          <label htmlFor="email" className="font-normal tracking-medium">Email</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter Email"
            className="rounded px-4 h-8  focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <label htmlFor="password" className="font-normal tracking-medium">Password</label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            placeholder="Enter Password"
            className="rounded px-4 h-8  focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <div className="flex gap-4">
            <p> Don&apos;t have an account?</p>
            <Link to="/auth/register" className="border-b border-green-600 text-green-600">
              Register
            </Link>
          </div>
          <button
            type="submit"
            className="border w-[80px] h-8 self-center justify-self-center mt-6 rounded border-green-600 bg-green-600 text-white hover:bg-green-500"
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin flex justify-center items-center"></div>
            ) : (
              'LOGIN'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
