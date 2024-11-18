// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
        // eslint-disable-next-line no-undef
        const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    const {id} = useParams();
    const navigate = useNavigate();
   
    // console.log(id);
    
    const [errors, setErrors] = useState({
        phone: '',
        salary: '',
        nin: '',
        fullname: '',
        email: '',
        db:'',
        password:''
      });
    const [employee, setEmployee] = useState({
        fullname: '',
        email: '',
        phone: '',
        nin: '',
        category_id: '',
        salary: '',
      });
    
      const [category,setCategory] = useState([])
      useEffect(()=>{
        axios.get(`${apiUrl}/admin/category`).then(res=>{
            if(res.data.Status){
                console.log(res.data.Result);
                
                setCategory(res.data.Result)
            }else {
                alert(res.data.error)
            }
    }).catch(err=>console.log(err))

    axios.get(`${apiUrl}/admin/employee/${id}`).then(res=>{
        if(res.data.Status){
            console.log(res.data.Result);
            
            setEmployee({
                ...employee,
                fullname: res.data.Result[0].fullname,
                email: res.data.Result[0].email,
                nin: res.data.Result[0].nin,
                phone: res.data.Result[0].phone,
                salary: res.data.Result[0].salary,
                category_id: res.data.Result[0].category_id
             
            


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

    // Phone validation: must be 11 digits and numeric
    const phonePattern = /^[0-9]{11}$/;
    if (!phonePattern.test(employee.phone)) {
      errorObj.phone = "Phone number must be 11 digits and contain only numbers.";
      valid = false;
    } else {
      errorObj.phone = '';
    }

    // NIN validation: must be 11 digits and numeric
    const ninPattern = /^[0-9]{11}$/;
    if (!ninPattern.test(employee.nin)) {
      errorObj.nin = "NIN must be 11 digits and contain only numbers.";
      valid = false;
    } else {
      errorObj.nin = '';
    }

    // Salary validation: must be a valid number
    if (isNaN(employee.salary) || employee.salary <= 0) {
      errorObj.salary = "Salary must be a valid positive number.";
      valid = false;
    } else {
      errorObj.salary = '';
    }

    // Full Name validation: cannot be empty
    if (employee.fullname.trim() === '') {
      errorObj.fullname = "Full Name is required.";
      valid = false;
    } else {
      errorObj.fullname = '';
    }

    // Email validation: simple regex to check for a valid email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(employee.email)) {
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
axios.put(`${apiUrl}/admin/edit_employee/${id}`, employee)
.then(res=>{
    if(res.data.Status){
        navigate('/admin/employees')
    }
    else {
        setErrors({...errors, db: res.data.error})
    }
    
})
.catch(err=>{
    console.log(err);
    
})
  }
  return (
    <div className='w-full flex flex-col min-h-screen justify-start items-center '>
       
    <div className='flex flex-col border rounded shadow p-2 md:p-6'>
  
        <h2 className='text-xl font-bold tracking-medium mb-6 text-center text-green-600'>Edit Employee</h2>
        <form className="grid grid-rows-2 gap-2"  method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
        {errors.db && <span className="text-red-600">{errors.db}</span>}
      <label htmlFor="fullname" className="font-normal tracking-medium">Full Name</label>

      <input
        type="text"
        name="fullname"
        value={employee?.fullname}
        onChange={(e) => 
         {
          setEmployee({...employee, fullname: e.target.value}) 
          setErrors({...errors, fullname:''})
        }
        
        }
        placeholder="Enter Full Name"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
      />
       {errors.fullname && <span className="text-red-600">{errors.fullname}</span>}
      <label htmlFor="email" className="font-normal tracking-medium">Email</label>
      <input
        type="email"
        name="email"
        value={employee?.email}
        onChange={(e) => {
           setEmployee({...employee, email: e.target.value})
           setErrors({...errors, email:''})
          
          }}
        placeholder="Enter Email"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
      />
       {errors.email && <span className="text-red-600">{errors.email}</span>}
      <label htmlFor="phone" className="font-normal tracking-medium">Phone Number</label>
      <input
        type="text"
        name="phone"
        value={employee?.phone}
        onChange={(e) => {
           setEmployee({...employee, phone: e.target.value})
           setErrors({...errors, phone:''})
          
          }}
        placeholder="Enter Phone Number"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
      />
       {errors.phone && <span className="text-red-600">{errors.phone}</span>}
      <label htmlFor="nin" className="font-normal tracking-medium">NIN number</label>
      <input
        type="text"
        name="nin"
        value={employee?.nin}
        onChange={(e) => {
          setEmployee({...employee, nin: e.target.value})
          setErrors({...errors, nin:''})
      }}
        placeholder="Enter NIN number"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
      />
       {errors.nin && <span className="text-red-600">{errors.nin}</span>}
      <label htmlFor="category" className="font-normal tracking-medium">Category</label>
      <select name="category_id" id="category_id"  className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"   onChange={(e) => setEmployee({...employee, category_id: e.target.value})} value={employee?.category_id}>
        {category.map(c=>{
            return <option value={c.id} key={c.id}>{c.name}</option>
        })}
      </select>
       
      <label htmlFor="salary" className="font-normal tracking-medium">Salary</label>
      <input
        type="text"
        name="salary"
        value={employee?.salary}
        onChange={(e) => {
          setEmployee({...employee, salary: e.target.value})
          setErrors({...errors, salary:''})
        
        }}
        placeholder="Enter Salary"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
      />
       {errors.salary && <span className="text-red-600">{errors.salary}</span>}
     
      <button
        type="submit"
        className="border w-[150px] h-10 self-center justify-self-center mt-6 rounded border-green-600 bg-green-600 text-white hover:bg-green-500"
      >
        Edit Employee
      </button>
      </form>
    </div>
</div>
  )
}
