import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import React from 'react';

const Category = () => {
    const [category,setCategory] = useState([])
      // eslint-disable-next-line no-undef
      const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
    useEffect(()=>{
        axios.get(`${apiUrl}/admin/category`).then(res=>{
            if(res.data.Status){
                console.log(res.data.Result);
                
                setCategory(res.data.Result)
            }else {
                alert(res.data.error)
            }
    }).catch(err=>console.log(err))
    },[])
  return (
    <div className=" px-2 md:px-5 mt-5 h-full">
        <div className="flex justify-center">
        <h1  className="font-bold text-xl text-center">Category List</h1>
        </div>
    
    

      <div className="mt-6 mb-12">
        <table className="w-full">
            <thead className="border-b-2 w-full flex items-start mt-4 pb-4">
                <th>Name</th>
            </thead>
            <tbody>
{
    category.map(c=>{
       return <tr key={c.id} className="w-full">
            <td className="border-b-2 w-full flex items-start mt-4 pb-4">
                {c.name}
            </td>
        </tr>
    })
}
            </tbody>
        </table>
      </div>
      <Link to='/admin/add_category' className="border rounded border-green-600 bg-green-600 h-4 w-16 p-4 text-xl  text-white mt-6">Add Category</Link>
    </div>
  );
};

export default Category;
