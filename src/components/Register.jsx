import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import React from 'react';

export default function Register() {
      // eslint-disable-next-line no-undef
      const apiUrl = process.env.REACT_APP_API_URL;
    const [category,setCategory] = useState([])
    const navigate = useNavigate();    
    const [errors, setErrors] = useState({
      phone: '',
      salary: '',
      nin: '',
      fullname: '',
      email: '',
      image:'',
      password:''
    });
    useEffect(()=>{
        axios.get(`${apiUrl}/admin/category`).then(res=>{
            if(res.data.Status){
                console.log(res.data.Result);
                
                setCategory(res.data.Result)
            }else {
              setErrors({...errors, db: res.data.error})
            }
    }).catch(err=>console.log(err))
    },[])
    useEffect(() => {
      // If the category list is not empty, set the first category as the default
      if (category.length > 0) {
        setEmployee((prev) => ({
          ...prev,
          category_id: category[0].id, // Set the default category ID to the first category's ID
        }));
      }
    }, [category]);
    const [employee, setEmployee] = useState({
        fullname: '',
        email: '',
        phone: '',
        password: '',
        emp_id: '', 
        nin: '',
        category_id: '',
        salary: '',
        image: '',
      });
    
  
   
    
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

    // Image validation: image is required
    if (!employee.image) {
      errorObj.image = "Image is required.";
      valid = false;
    } else {
      errorObj.image = '';
    }
    if (!employee.password){
      errorObj.password = "Password is required"
      valid = false
    }
    else {
      errorObj.password = ''
    }
    // Set error messages if any
    setErrors(errorObj);
    return valid;
  };
    // console.log(employee);
    
    const handleSubmit = async (event) => {
      event.preventDefault();
      // Run validation before submitting the form
    if (!validateForm()) {
      return;
    }
      
      // Create a new FormData instance
      const formData = new FormData();
      formData.append('fullname', employee.fullname);
      formData.append('email', employee.email);
      formData.append('phone', employee.phone);
      formData.append('password', employee.password);
      formData.append('emp_id', employee.emp_id);
      formData.append('nin', employee.nin);
      formData.append('category_id', employee.category_id);
      formData.append('salary', employee.salary);
      formData.append('image', employee.image);  // File data
    
      try {
        const response = await axios.post(`${apiUrl}/user/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for file uploads with Axios
          },
        });
    
        if(response.data.Status){
          navigate('/auth/login')
              } else {
                setErrors({...errors, db: response.data.error})
              }
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    };
      // Log the employee object to check its state
  // console.log('Employee State Before Submit:', employee);
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     const employeeId = generateEmployeeId();
  //     // Perform client-side validation
  //     if (!employee.fullname || !employee.email || !employee.phone || !employee.password || !employee.nin || !employee.category_id || !employee.salary || !employee.image) {
  //       alert('Please fill in all fields');
  //       return;
  //     }
  
  //     if (isNaN(employee.salary)) {
  //       alert('Salary must be a number');
  //       return;
  //     }
  
  //     const formData = new FormData();
  //     formData.append('fullname', employee.fullname);
  //     formData.append('email', employee.email);
  //     formData.append('phone', employee.phone);
  //     formData.append('password', employee.password);
  //     formData.append('emp_id', employeeId);
  //     formData.append('nin', employee.nin);
  //     formData.append('category_id', employee.category_id);
  //     formData.append('salary', employee.salary);
  //     formData.append('image', employee.image);
  //   // Check if the image is being passed correctly
  //   if (employee.image && employee.image instanceof File) {
  //     formData.append('image', employee.image);
  //   } else {
  //     console.log('No image selected or invalid file');
  //   }
  
  //   console.log('Form Data Submitted:', formData); // Log to verify form data
  //   // Log formData entries to verify what is being appended
  //   for (let [key, value] of formData.entries()) {
  //     console.log(key, value);
  //   }
  //     try {
  //       const response = await axios.post('http://localhost:3000/admin/add_employee', formData, 
  //         {   headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },}
  //       );
  
  //       if (response.data.Status) {
  //         alert('Employee added successfully');
  //       } else {
  //         alert('Error: ' + response.data.error);
  //       }
  //     } catch (error) {
  //       console.error('Error submitting form:', error);
  //       alert('There was an error while submitting the form');
  //     }
  //   };
  return (
    <div className='w-full flex flex-col min-h-screen justify-start items-center '>
       
    <div className='flex flex-col border rounded shadow p-2 md:p-6'>
  
        <h2 className='text-xl font-bold tracking-medium mb-6 text-center text-green-600'>Register</h2>
        <form className="grid grid-rows-2 gap-2" onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
        {errors.db && <span className="text-red-600">{errors.db}</span>}
      <label htmlFor="fullname" className="font-normal tracking-medium">Full Name</label>

      <input
        type="text"
        name="fullname"
        // value={employee.fullname}
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
        // value={employee.email}
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
        // value={employee.phone}
        onChange={(e) => {
           setEmployee({...employee, phone: e.target.value})
           setErrors({...errors, phone:''})
          
          }}
        placeholder="Enter Phone Number"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
      />
       {errors.phone && <span className="text-red-600">{errors.phone}</span>}
      
      <label htmlFor="password" className="font-normal tracking-medium">Password</label>
      <input
        type="password"
        name="password"
        // value={employee.password}
        onChange={(e) => {
          setEmployee({...employee, password: e.target.value})
          setErrors({...errors, password:''})
        }}
        placeholder="Enter Password"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
      />
       {errors.password && <span className="text-red-600">{errors.password}</span>}
      <label htmlFor="emp_id" className="font-normal tracking-medium">Employee ID</label>
      <input
        type="text"
        name="emp_id"
       
        onChange={(e) => setEmployee({...employee, emp_id: e.target.value})}
        placeholder="Employee ID will be auto-generated"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
        disabled
      />
      <label htmlFor="nin" className="font-normal tracking-medium">NIN number</label>
      <input
        type="text"
        name="nin"
        // value={employee.nin}
        onChange={(e) => {
          setEmployee({...employee, nin: e.target.value})
          setErrors({...errors, nin:''})
      }}
        placeholder="Enter NIN number"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
      />
       {errors.nin && <span className="text-red-600">{errors.nin}</span>}
      <label htmlFor="category" className="font-normal tracking-medium">Category</label>
      <select name="category_id" id="category_id"  className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"   onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
        {category.map(c=>{
            return <option value={c.id} key={c.id}>{c.name}</option>
        })}
      </select>
       
      <label htmlFor="salary" className="font-normal tracking-medium">Salary</label>
      <input
        type="text"
        name="salary"
        // value={employee.salary}
        onChange={(e) => {
          setEmployee({...employee, salary: e.target.value})
          setErrors({...errors, salary:''})
        
        }}
        placeholder="Enter Salary"
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
      />
       {errors.salary && <span className="text-red-600">{errors.salary}</span>}
      {/* <label htmlFor="image" className="font-normal tracking-medium">Image</label>
      <input
        type="file"
        name="image"
        onChange={(e) => {
          setEmployee({...employee, image: e.target.files[0]})
          setErrors({...errors, image:''})
        }}
        className="rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
      /> */}
        <div className="flex flex-col gap-1">
            <label htmlFor="waec" className="font-normal tracking-medium">Image</label>
            <input
              type="file"
              id="image"
              onChange={(e) => {
                setEmployee({...employee, image: e.target.files[0]})
                setErrors({...errors, image:''})
              }}
              className="w-full  h-8 border focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50 rounded"
            />
          </div>
       {errors.image && <span className="text-red-600">{errors.image}</span>}
       <div className="flex gap-4">
        <p> Have an account already?</p>
        <Link to='/auth/login' className="border-b border-green-600 text-green-600">Login</Link>
        </div>
      <button
        type="submit"
        className="border w-[150px] h-10 self-center justify-self-center mt-6 rounded border-green-600 bg-green-600 text-white hover:bg-green-500"
      >
        Create Account
      </button>
      </form>
    </div>
</div>
  )
}
