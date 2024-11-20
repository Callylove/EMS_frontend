

// import React from 'react';

import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function AdminDashboard() {
   const [adminTotal, setAdminTotal] = useState()
   const [employeeTotal, setEmployeeTotal] = useState()
   const [salaryTotal, setSalaryTotal] = useState()
   const [admins,setAdmins] = useState([])
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState('');
       // eslint-disable-next-line no-undef
       const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
   
   const AdminRecords = ()=> {
    axios.get(`${apiUrl}/admin/admin_records`)
    .then(res=>{
      if(res.data.Status) {
        setLoading(false)
        setAdmins(res.data.Result)
      }
    })
   }
   const adminCount = () => {
    axios.get(`${apiUrl}/admin/admin_count`)
    .then(res=>{
      if(res.data.Status) {
        setLoading(false)
        setAdminTotal(res.data.Result[0].admin)
      }
    })
    .catch((err)=>{
      setError(err)
    })
   }
   const employeeCount = () => {
    axios.get(`${apiUrl}/admin/employee_count`)
    .then(res=>{
      if(res.data.Status) {
        setLoading(false)
        setEmployeeTotal(res.data.Result[0].employee)
      }
    })
    .catch((err)=>{
      setError(err)
    })
   }
   const salaryCount = () => {
    axios.get(`${apiUrl}/admin/salary_count`)
    .then(res=>{
      if(res.data.Status) {
        setLoading(false)
        setSalaryTotal(res.data.Result[0].salary)
      }
    })
    .catch((err)=>{
      setError(err)
    })
   }
   useState(()=>{
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();

   },[])
   const handleDelete = (id) => {
    axios.delete(`${apiUrl}/admin/delete_admin/${id}`)
    .then(res=>{
      if(res.data.Status){
        window.location.reload()
      }else{
        console.log(res.data.error);
        
      }
    })
    .catch(err=>{
      console.log(err);
      
    })
      }
      if (loading) return <div className='flex justify-center items-center"'>Loading...</div>;
      if (error) return <div>{error}</div>;
  return (
    <div >  <h1 className="font-bold text-xl mb-12">Welcome Admin</h1>
    <div className="p-3 flex flex-col md:flex-row justify-around mt-3">
    
   <div className="px-3 pt-2 pb-3 border rounded shadow w-32">
    <div className="text-center pb-1">
      <h4 className="font-bold text-xl">Admin</h4>
    </div>
    <hr />
    <div className="flex justify-between">
      <h5 >Total:</h5>
      <h5>{adminTotal}</h5>
    </div>
   </div>
   <div className="px-3 pt-2 pb-3 border rounded shadow w-32">
    <div className="text-center pb-1">
      <h4 className="font-bold text-xl">Employee</h4>
    </div>
    <hr />
    <div className="flex justify-between">
      <h5 >Total:</h5>
      <h5>{employeeTotal}</h5>
    </div>
   </div>
   <div className="px-3 pt-2 pb-3 border rounded shadow w-32">
    <div className="text-center pb-1">
      <h4 className="font-bold text-xl">Salary</h4>
    </div>
    <hr />
    <div className="flex justify-between">
      <h5 >Total:</h5>
      <h5>#{salaryTotal}</h5>
    </div>
   </div>


  </div>
  <div className="mt-4 px-4 pt-3">
    <h3 className="font-bold">List of Admins</h3>
    <table className="table-auto w-full border-collapse">
  <thead className="bg-gray-100 border-b-2">
    <tr >
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
    
      <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      admins.map((e) => (
        <tr key={e.id} className="border-b hover:bg-gray-50">
       
          <td className="px-4 py-2 text-sm text-gray-700">{e.email}</td>
          <td className="px-4 py-2 text-sm flex ">
            <Link to={`/admin/edit_admin/${e.id}`} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">Edit</Link>
            <button className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none ml-2" onClick={()=>handleDelete(e.id)} >Delete</button>
          </td>
        </tr>
      ))
    }
  </tbody>
</table>
   </div>
  </div>
  )
}
