import axios from 'axios';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    // Fetch user details from the server
    const fetchUserDetails = async () => {
      try {
        // const response = await axios.get('http://localhost:3000/user/details', { withCredentials: true });
        
     
        const response = await axios.get('https://ems-backend-hd5f.onrender.com/user/details', { withCredentials: true });
    
        
        
        
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
  // const handleProfileUpdate = async () => {
  //   // Simulate profile update process with a delay
  //   setUpdateStatus({ success: false, message: 'Submitting your profile for approval...' });
  //   setTimeout(() => {
  //     setUpdateStatus({
  //       success: true,
  //       message: 'Your profile has been updated successfully. Waiting for admin approval!',
  //     });
  //   }, 3000); // Simulate success after 3 seconds
  // };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="dashboard container  px-2 py-2 md:px-4 md:py-8">
      {/* User Info */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {userDetails?.fullname}
        </h1>
        <p className="text-lg text-gray-600">Here&apos;s your profile information</p>
      </div>

      {/* Profile Update Status */}
      {/* {updateStatus && (
        <div
          className={`p-4 rounded-lg mb-8 ${
            updateStatus.success ? 'bg-green-500' : 'bg-yellow-500'
          } text-white text-center`}
        >
          <p>{updateStatus.message}</p>
        </div>
      )} */}

      {/* Profile Details */}
      <div className="bg-white shadow-lg rounded-lg p-3 md:p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Profile Information</h2>
        <hr />
        <div className="space-y-4">
          <div className="flex justify-between">
            <strong className="text-gray-600">Full Name:</strong>
            <span className="text-gray-800">{userDetails?.fullname}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">Email:</strong>
            <span className="text-gray-800">{userDetails?.email}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">Phone Number:</strong>
            <span className="text-gray-800">{userDetails?.phone}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">Place of Work:</strong>
            <span className="text-gray-800">{userDetails?.placeOfWork || 'Not updated yet'}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">Job Title:</strong>
            <span className="text-gray-800">{userDetails?.jobTitle || 'Not updated yet'}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">Employee ID:</strong>
            <span className="text-gray-800">{userDetails?.emp_id || 'Not updated yet'}</span>
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">Salary:</strong>
            <span className="text-gray-800">{userDetails?.salary || 'Not updated yet'}</span>
          </div>
        </div>
      </div>

      {/* Document Upload Status */}
      <div className="bg-white shadow-lg rounded-lg p-3 md:p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>
        <hr />
        <div className="space-y-4">
          <div className="flex justify-between">
            <strong className="text-gray-600">WAEC Result:</strong>
            <span className="text-gray-800 ">
          
              {userDetails?.waec ? 'Uploaded' : 'Not uploaded'}
            </span>
       
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">JAMB Result:</strong>
            <span className="text-gray-800">
              {userDetails?.jamb ? 'Uploaded' : 'Not uploaded'}
            </span>
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">Degree Certificate:</strong>
            <span className="text-gray-800">
              {userDetails?.degree ? 'Uploaded' : 'Not uploaded'}
            </span>
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">Employment Letter:</strong>
            <span className="text-gray-800">
              {userDetails?.employmentLetter ? 'Uploaded' : 'Not uploaded'}
            </span>
          </div>
          <hr />
          <div className="flex justify-between">
            <strong className="text-gray-600">Job termination/Retirement letter:</strong>
            <span className="text-gray-800">
              {userDetails?.terminate ? 'Uploaded' : 'Not uploaded'}
            </span>
          </div>
        </div>
      </div>


    </div>
  );
};

export default UserDashboard;
