

// export default function UserProfile() {
//   return (
//     <div>UserProfile</div>
//   )
// }


import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
//   const UserRecords = ()=> {
//     axios.get('http://localhost:3000/user/details')
//     .then(res=>{
//       if(res.data.Status) {
//         setUserDetails(res.data.user)
//         console.log(res.data.user);
        
//       }
//     }).catch(err=>alert(err))
//    }
useEffect(() => {
    // Fetch user details from the server
    const fetchUserDetails = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/user/details', { withCredentials: true });
        
     
        const response = await axios.get('http://localhost:3000/user/details', { withCredentials: true });
    
        
        
        
        if (response.data.Status) {
          console.log(response.data);
          
          // Set the fetched user data in state
          setUserDetails(response.data.user);  // Update state with user data
        } else {
          setError('Failed to load user details');
        }
      } catch (err) {
      
        
        setError('Error fetching user data',err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <h1 className="font-bold text-xl text-center">Profile</h1>
      <div className="mt-6  flex flex-col items-center">
        
      <div key={userDetails?.id} className="px-3 pt-2 pb-3 border rounded shadow w-[300px]">

     
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center">
        <img src={`http://localhost:3000/images/${userDetails?.image}`} alt={userDetails?.id} className="h-16 w-16 rounded-full object-cover" />
        </div>
   <hr />
        <div className="flex justify-between">
        <h5 >Full Name:</h5>
        <h5>{userDetails?.fullname}</h5>
        </div>
        <hr />
       <div className="flex justify-between">
       <h5 >Email:</h5>
       <h5>{userDetails?.email}</h5>
       </div>
       <hr />
       <div className="flex justify-between">
       <h5 >NIN:</h5>
       <h5>{userDetails?.nin}</h5>
       </div>
       <hr />
       <div className="flex justify-between">
       <h5 >Phone Number:</h5>
       <h5>{userDetails?.phone}</h5>
       </div>
       <hr />
       <div className="flex justify-between">
       <h5 >Employee ID:</h5>
       <h5>{userDetails?.emp_id}</h5>
       </div>
       <hr />
       <div className="flex justify-between">
       <h5 >Salary:</h5>
       <h5>{userDetails?.salary}</h5>
       </div>
      
      </div>
     </div>
  
      </div>
     </div>
  );
};

export default UserProfile;
