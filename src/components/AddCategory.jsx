// import axios from 'axios';
// import  { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// // import React from 'react';
// export default function AddCategory() {
//           // eslint-disable-next-line no-undef
//           const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
//     const [category,setCategory] = useState(null)
//     const [err,setErr] = useState('')
//     const navigate = useNavigate();
//     const handleSubmit = (e) => {
// e.preventDefault();
// axios.post(`${apiUrl}/admin/add_category`, {category}).then(res=>{
//     console.log(res.data);
    
//     if(res.data.Status){
// navigate('/admin/category')
//     } else {
//         setErr(res.data.error)
//     }
// }).catch(err=>console.log(err));


//     }
//   return (
//     <div className='w-full flex flex-col min-h-screen justify-start items-center '>
       
//     <div className='flex flex-col border rounded shadow p-6'>
  
//         <h2 className='text-xl font-bold tracking-medium mb-6 text-center text-green-600'>Add Category</h2>
//         <form onSubmit={handleSubmit} className='grid grid-rows-2   gap-2' method='POST'>
//         {err && <span className="text-red-600">{err}</span>}
//                 <label htmlFor="category" className='font-normal tracking-medium'>Category</label>
//                 <input type="text" name='category'  placeholder='Enter Category' className='rounded px-4 h-8  focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50' onChange={(e)=>setCategory(e.target.value)}/>
          
  
            
     
//             <button className='border w-[150px] h-10  self-center justify-self-center mt-6 rounded border-green-600 bg-green-600 text-white hover:bg-green-500'>Add Category</button>
//         </form>
//     </div>
// </div>
//   )
// }

import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddCategory() {
  // eslint-disable-next-line no-undef
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [category, setCategory] = useState('');
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState(""); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when submitting

    axios
      .post(`${apiUrl}/admin/add_category`, { category })
      .then((res) => {
        console.log(res.data);

        if (res.data.Status) {
            setSuccessMessage("Category added Successful! Redirecting to category...");

            // Show the success message for 2 seconds before redirecting
            setTimeout(() => {
                navigate('/admin/category');// Redirect to category
            }, 2000);
       
        } else {
          setErr(res.data.error);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr('An error occurred while adding the category.');
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state after the request is finished
      });
  };

  return (
    <div className='w-full flex flex-col min-h-screen justify-start items-center'>
           {/* Display success message */}
       {successMessage && (
          <div className="text-green-600 mb-2">
            <p>{successMessage}</p>
          </div>
        )}
      <div className='flex flex-col border rounded shadow p-6'>
        <h2 className='text-xl font-bold tracking-medium mb-6 text-center text-green-600'>
          Add Category
        </h2>
        <form onSubmit={handleSubmit} className='grid grid-rows-2 gap-2' method='POST'>
          {err && <span className="text-red-600">{err}</span>}
          <label htmlFor="category" className='font-normal tracking-medium'>
            Category
          </label>
          <input
            type="text"
            name='category'
            value={category}
            placeholder='Enter Category'
            className='rounded px-4 h-8 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50'
            onChange={(e) => setCategory(e.target.value)}
            disabled={isLoading} // Disable input while loading
          />
                <div className="flex justify-center items-center w-full">
  <button
    type="submit"
    className="border w-[80px] h-8 rounded flex items-center justify-center border-green-600 bg-green-600 text-white hover:bg-green-500"
    disabled={isLoading} // Disable the button while loading
  >
    {isLoading ? (
      <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
    ) : (
      'Add Category'
    )}
  </button>
</div>
        </form>
      </div>
    </div>
  );
}
