import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Employees = () => {
  const [employee,setEmployee] = useState<any>([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  const [err, setErr] = useState('')
    // eslint-disable-next-line no-undef
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  useEffect(()=>{
      axios.get(`${apiUrl}/admin/employee`).then(res=>{
          if(res.data.Status){
              console.log(res.data.Result);
              setLoading(false)
              setEmployee(res.data.Result)
          }else {
              alert(res.data.error)
          }
  }).catch(err=>console.log(err))
  },[])
  const [category,setCategory] = useState<any>([])
    useEffect(()=>{
        axios.get(`${apiUrl}/admin/category`).then(res=>{
            if(res.data.Status){
           
                setLoading(false)
                setCategory(res.data.Result)
            }else {
              setLoading(false)
                setErr(res.data.error)
            }
    }).catch(err=>
      {
        console.log(err) 
        setLoading(false)
      })
    },[])
    // Map category ids to names for easier lookup
    const categoryMap = category.reduce((map, category) => {
      map[category.id] = category.name;  // Assuming category has 'id' and 'name'
      return map;
  }, {});

  // Create a new employee list with category name instead of category id
  const employeesWithCategoryName = employee.map(emp => ({
      ...emp,  // Spread other employee fields
      category_id: categoryMap[emp.category_id] || 'Unknown Category'  // Replace with category name
  }));
  const handleDelete = (id) => {
axios.delete(`${apiUrl}/admin/delete_employee/${id}`)
.then(res=>{
  if(res.data.Status){
    window.location.reload()
  }else{
    setErr(res.data.error)
  }
})
.catch(err=>{
  console.log(err);
  
})
  }

  if (loading) return <div className='flex justify-center items-center"'>Loading...</div>;
 
  return (
   <div className="px-2  mt-5 h-full w-full">
        <div className="flex justify-center">
        <h1  className="font-bold text-xl text-center">Employee List</h1>
        </div>
     
        <div className='mt-6 mb-12'>
        {err && <span className="text-red-600">{err}</span>}
        {/* <table className="table-auto w-full">
            <thead className=" border-b-2 h-full w-full flex items-start justify-between">
                <th className=' h-full'>Full Name</th>
                <th>Image</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Employee ID</th>
                <th>NIN</th>
                <th>Salary</th>
                <th>Action</th>
            </thead>
            <tbody className=' w-full'>
{
    employee.map(e=>{
      
       return <tr key={e.id} className="border-b-2 h-full w-full grid grid-cols-auto grid-rows-1 gap-12">
            <td className=" w-full  mt-4">
                {e.fullname}
            </td>
            <td className=" w-full  mt-4">
                <img src={`http://localhost:3000/images/`+ e.image} alt={e.fullname} className='h-16 w-16 rounded-full' />
            </td>
            <td className="w-full   mt-4">
                {e.email}
            </td>
            <td className="w-full  mt-4">
                {e.phone}
            </td>
            <td className="w-full   mt-4">
                {e.emp_id}
            </td>
            <td className="w-full  mt-4">
                {e.nin}
            </td>
            <td className="w-full mt-4">
                {e.salary}
            </td>
            <td className=" w-full  mt-4">
               <button>Edit</button>
               <button>Delete</button>
            </td>
        </tr>
    })
}
            </tbody>
        </table> */}
        <table className="table-auto w-full border-collapse">
  <thead className="bg-gray-100 border-b-2">
    <tr >
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Full Name</th>
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Image</th>
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Phone Number</th>
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Employee ID</th>
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Category</th>
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">NIN</th>
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Salary</th>
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      employeesWithCategoryName.map((e) => (
        <tr key={e.id} className="border-b hover:bg-gray-50">
          <td className="px-4 py-2 text-sm text-gray-700">{e.fullname.charAt(0).toUpperCase() + e.fullname.slice(1).toLowerCase()}</td>
          <td className=" text-sm">
            <img src={`${apiUrl}/${e.image}`} alt={e.fullname} className="h-16 w-16 rounded-full object-cover" />
          </td>
          <td className="px-4 py-2 text-sm text-gray-700">{e.email}</td>
          <td className="px-4 py-2 text-sm text-gray-700">{e.phone}</td>
          <td className="px-4 py-2 text-sm text-gray-700">{e.emp_id}</td>
          <td className="px-4 py-2 text-sm text-gray-700">{e.category_id}</td>
          <td className="px-4 py-2 text-sm text-gray-700">{e.nin}</td>
          <td className="px-4 py-2 text-sm text-gray-700">{e.salary}</td>
          <td className="px-4 py-2 text-sm flex">
            <Link to={`/admin/edit_employee/${e.id}`} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">Edit</Link>
            <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none ml-2" onClick={()=>handleDelete(e.id)}>Delete</button>
          </td>
        </tr>
      ))
    }
  </tbody>
</table>
        </div>
        <Link to='/admin/add_employee' className="border rounded border-green-600 bg-green-600 h-8 w-full md:h-4 md:w-16 p-4 text-xl  text-white mt-6">Add Employee</Link>
    </div>
  );
};

export default Employees;
