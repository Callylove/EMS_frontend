// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAdmin() {
        // eslint-disable-next-line no-undef
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const [successMessage, setSuccessMessage] = useState(""); 
   
    // console.log(id);
    
    const [errors, setErrors] = useState({
        email: '',
        db:'',
    
      });
    const [admin, setAdmin] = useState({
 
        email: '',
      
      });
    
 
      useEffect(()=>{
        

    axios.get(`${apiUrl}/admin/admin_records`).then(res=>{
        if(res.data.Status){
            console.log(res.data.Result);
            
            setAdmin({
                ...admin,
                email: res.data.Result[0].email,
             
            


            })
        }else {
            setErrors({...errors, db: res.data.error})
        }
}).catch(err=>console.log(err))

//   // If the category list is not empty, set the first category as the default
//   if (category.length > 0) {
//     setEmployee((prev) => ({
//       ...prev,
//       category_id: category[0].id, // Set the default category ID to the first category's ID
//     }));
//   }
    },[])



    // console.log(employee);
    
      // Validation function for the entire form
  const validateForm = () => {
    let valid = true;
    let errorObj = { ...errors };

    // Email validation: simple regex to check for a valid email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(admin.email)) {
      errorObj.email = "Please enter a valid email.";
      valid = false;
    } else {
      errorObj.email = '';
    }

    // Set error messages if any
    setErrors(errorObj);
    return valid;
  };
  const handleSubmit = (e) => {
e.preventDefault();
if (!validateForm()) {
    return;
  }
  setIsLoading(true); // Start loading when form is submitted
axios.put(`${apiUrl}/admin/edit_admin/${id}`, admin)
.then(res=>{
    if(res.data.Status){
      setIsLoading(false);
      setSuccessMessage("Admin edited Successful! Redirecting to dashboard...");

      // Show the success message for 2 seconds before redirecting
      setTimeout(() => {
        navigate('/admin/dashboard')// Redirect to dashboard
      }, 2000);
        
    }
    else {
      setIsLoading(false)
        setErrors({...errors, db: res.data.error})
    }
    
})
.catch(err=>{
  setIsLoading(false)
    console.log(err);
    
})
  }
  return (
    <div className='w-full flex flex-col min-h-screen justify-start items-center '>
           {/* Display success message */}
           {successMessage && (
          <div className="text-green-600 mb-2">
            <p>{successMessage}</p>
          </div>
        )}
    <div className='flex flex-col border rounded shadow p-2 md:p-6'>
  
        <h2 className='text-xl font-bold tracking-medium mb-6 text-center text-green-600'>Edit Admin</h2>
        <form className="grid grid-rows-2 gap-2"  method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        {errors.db && <span className="text-red-600">{errors.db}</span>}
    

      <label htmlFor="email" className="font-normal tracking-medium">Email</label>
      <input
        type="email"
        name="email"
        value={admin?.email}
        onChange={(e) => {
           setAdmin({...admin, email: e.target.value})
           setErrors({...errors, email:''})
          
          }}
        placeholder="Enter Email"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
      />
       {errors.email && <span className="text-red-600">{errors.email}</span>}
      
     
       <div className="flex justify-center items-center w-full">
  <button
    type="submit"
    className="border w-[80px] h-8  flex items-center justify-center rounded border-green-600 bg-green-600 text-white hover:bg-green-500"
    disabled={isLoading} // Disable the button while loading
  >
    {isLoading ? (
      <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
    ) : (
      'Edit Admin'
    )}
  </button>
</div>
      </form>
    </div>
</div>
  )
}
