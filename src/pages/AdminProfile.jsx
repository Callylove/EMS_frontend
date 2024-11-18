// import React from 'react';

import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const [admins,setAdmins] = useState([])
    // eslint-disable-next-line no-undef
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const AdminRecords = ()=> {
    axios.get(`${apiUrl}/admin/admin_records`)
    .then(res=>{
      if(res.data.Status) {
        setAdmins(res.data.Result)
      }
    }).catch(err=>alert(err))
   }
   useEffect(()=>{
    AdminRecords();
   },[])
  return (
    <div>
      <h1 className="font-bold text-xl text-center">Profile</h1>
      <div className="mt-6  flex flex-col items-center">
        
      {admins.map(a=>{
      return    <div key={a.email} className="px-3 pt-2 pb-3 border rounded shadow w-[300px]">

     
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
        <h5 >Email:</h5>
        <h5>{a.email}</h5>
        </div>
     
      
      
      </div>
     </div>
      })}
      </div>
     </div>
  );
};

export default Profile;
