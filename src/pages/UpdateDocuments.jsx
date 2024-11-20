// import React from 'react';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const UserDashboard = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     // Fetch user details from the server
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/user/details', { withCredentials: true });
        
//         if (response.data.Status) {
//           console.log(response.data.user);
          
//           // setUserDetails(response.data.user);
//         } else {
//           setError('Failed to load user details');
//         }
//       } catch (err) {
//         setError('Error fetching user data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, []); // Empty array means this runs once on mount

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="dashboard">
//       <h1>Welcome, {userDetails?.fullname}</h1>
//       <p>Email: {userDetails?.email}</p>
//       <p>Phone: {userDetails?.phone}</p>
//       <p>Role: {userDetails?.role}</p>
//       {/* Display other user details as needed */}
//     </div>
//   );
// };
const UpdateDocuments = () => {
  // const [userDetails, setUserDetails] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   // Fetch user details from the server
  //   const fetchUserDetails = async () => {
  //     try {
  //       // const response = await axios.get('http://localhost:3000/user/details', { withCredentials: true });
        
     
  //       const response = await axios.get('http://localhost:3000/user/details', { withCredentials: true });
    
        
        
        
  //       if (response.data.Status) {
  //         console.log(response.data);
          
  //         // Set the fetched user data in state
  //         setUserDetails(response.data.user);  // Update state with user data
  //       } else {
  //         setError('Failed to load user details');
  //       }
  //     } catch (err) {
      
        
  //       setError('Error fetching user data',err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserDetails();
  // }, []); // Empty array means this runs once on mount

  // // Handle loading state
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // // Handle error state
  // if (error) {
  //   return <div>{error}</div>;
  // }
  const [userDetails, setUserDetails] = useState(null);
  const [documents, setDocuments] = useState({
    waec: null,
    jamb: null,
    employmentLetter: null,
    degree:null,
    age: '',
    placeOfWork: '',
    jobTitle: '',
    jobType: '',
    jobTerminate:''

  });
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState('');
  const [error, setError] = useState({
    waec: '',
    jamb: '',
    employmentLetter: '',
    degree:'',
    age: '',
    placeOfWork: '',
    jobTitle: '',
    jobType: '',
    jobTerminate:'',
  });
  const navigate = useNavigate()
  // eslint-disable-next-line no-undef
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  useEffect(() => {
    // Fetch user details from the server
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/user/details`, { withCredentials: true });

        if (response.data.Status) {
          setUserDetails(response.data.user);
        } else {
          setError('Failed to load user details');
        }
      } catch (err) {
        setError('Error fetching user data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFileChange = (e, docType) => {
    setDocuments({
      ...documents,
      [docType]: e.target.files[0],
    });
  };

   // Validation function

const validateForm = () => {
  let valid = true;
  let errorObj = { ...error }; // Clone the existing errors state

  // Age validation: Must be a number and greater than 0
  if (!/^\d+$/.test(documents.age) || documents.age <= 0) {
    errorObj.age = "Age must be a valid positive number.";
    valid = false;
  } else {
    errorObj.age = '';
  }

  // Place of Work validation: Can only contain letters and spaces
  if (!/^[A-Za-z\s]+$/.test(documents.placeOfWork)) {
    errorObj.placeOfWork = "Place of work must only contain letters and spaces.";
    valid = false;
  } else {
    errorObj.placeOfWork = '';
  }

  // Job Title validation: Can only contain letters and spaces
  if (!/^[A-Za-z\s]+$/.test(documents.jobTitle)) {
    errorObj.jobTitle = "Job title must only contain letters and spaces.";
    valid = false;
  } else {
    errorObj.jobTitle = '';
  }

  // Job Type validation: Can only contain letters and spaces
  if (!/^[A-Za-z\s]+$/.test(documents.jobType)) {
    errorObj.jobType = "Job type must only contain letters and spaces.";
    valid = false;
  } else {
    errorObj.jobType = '';
  }

  // File Uploads validation: Check if files are uploaded for each document
  if (!documents.waec) {
    errorObj.waec = "Please upload your WAEC result.";
    valid = false;
  } else {
    errorObj.waec = '';
  }

  if (!documents.jamb) {
    errorObj.jamb = "Please upload your JAMB result.";
    valid = false;
  } else {
    errorObj.jamb = '';
  }

  if (!documents.degree) {
    errorObj.degree = "Please upload your degree certificate.";
    valid = false;
  } else {
    errorObj.degree = '';
  }

  if (!documents.employmentLetter) {
    errorObj.employmentLetter = "Please upload your employment letter.";
    valid = false;
  } else {
    errorObj.employmentLetter = '';
  }

  // Set error messages if any
  setError(errorObj);

  return valid; // Return true if everything is valid, else false
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm(); // Validate the form

    if (!isValid) {
      return; // Do not proceed with form submission if there are errors
    }
    const formData = new FormData();
    Object.keys(documents).forEach((key) => {
      if (documents[key]) {
        formData.append(key, documents[key]);
      }
    });
    const userID = userDetails.id

    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/user/updateProfile/${userID}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (response.data.Status) {
        console.log('Profile updated successfully');
        navigate('/user/dashboard')
      } else {

        setError('Failed to update profile');
      }
    } catch (err) {
      console.log(err);
      
      setError('Error uploading documents');
    } finally {

      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  // Display user details
  return (
    <div className="dashboard">
    

      {/* Document Upload Section */}
      <div className="document-upload bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">Update Your Profile</h2>
        <p className="mt-2">Please upload the following documents to complete your profile:</p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* WAEC Result */}
          <div className="flex items-center space-x-4">
            <label htmlFor="waec" className="w-48">Upload WAEC Result:</label>
            <input
              type="file"
              id="waec"
              onChange={(e) => {
                handleFileChange(e, 'waec')
                setError({...error, waec:''})
              }}
              disabled={userDetails?.waec}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
            />
          </div>
          {error.waec && !userDetails?.waec  && <p className="text-red-500 text-sm">{error.waec}</p>}
          {/* JAMB Result */}
          <div className="flex items-center space-x-4">
            <label htmlFor="jamb" className="w-48">Upload JAMB Result:</label>
            <input
              type="file"
              id="jamb"
              onChange={(e) => {
                handleFileChange(e, 'jamb')
                setError({...error, jamb:''})
              
              }}
              disabled={userDetails?.jamb}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
            />
          </div>
          {error.jamb && !userDetails?.jamb  && <p className="text-red-500 text-sm">{error.jamb}</p>}
           {/* Degree Result */}
           <div className="flex items-center space-x-4">
            <label htmlFor="jamb" className="w-48">Upload Degree Certificate / Result:</label>
            <input
              type="file"
              id="degree"
              onChange={(e) => {
                handleFileChange(e, 'degree')
                setError({...error, degree:''})
              
              }}
              disabled={userDetails?.degree}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
            />
          </div>
          {error.degree && !userDetails?.degree && <p className="text-red-500 text-sm">{error.degree}</p>}
          {/* Employment Letter */}
          <div className="flex items-center space-x-4">
            <label htmlFor="employmentLetter" className="w-48">Upload Employment Letter:</label>
            <input
              type="file"
              id="employmentLetter"
              onChange={(e) => {
                handleFileChange(e, 'employmentLetter')
                setError({...error, employmentLetter:''})
              
              }}
              disabled={userDetails?.employmentLetter}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
            />
          </div>
          {error.employmentLetter && !userDetails?.employmentLetter && <p className="text-red-500 text-sm">{error.employmentLetter}</p>}
          {/* Job termination or Retirement Letter */}
          <div className="flex items-center space-x-4">
            <label htmlFor="employmentLetter" className="w-48">Upload Job Termination or Retirement Letter:</label>
            <input
              type="file"
              id="jobTerminate"
              onChange={(e) => {
                handleFileChange(e, 'jobTerminate')
                setError({...error, jobTerminate:''})
              
              }}
              disabled={userDetails?.jobTerminate}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
            />
          </div>
     

          {/* Other Profile Information */}
          <div className="space-y-4 mt-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="age" className="w-48 ">Age:</label>
              <input
                type="text"
                id="age"
                value={documents.age}
                onChange={(e) => {
                  setDocuments({ ...documents, age: e.target.value })
                  setError({...error, age:''})
                }}
                disabled={userDetails?.age}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
                placeholder="Enter your age"
              />
            </div>
            {error.age && !userDetails?.age && <p className="text-red-500 text-sm">{error.age}</p>}
            <div className="flex items-center space-x-4">
              <label htmlFor="placeOfWork" className="w-48">Place of Work:</label>
              <input
                type="text"
                id="placeOfWork"
                value={documents.placeOfWork}
                onChange={(e) => {
                  setDocuments({ ...documents, placeOfWork: e.target.value })
                  setError({...error, placeOfWork:''})
                }}
                disabled={userDetails?.placeOfWork}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
                placeholder="Enter your place of work"
              />
            </div>
            {error.placeOfWork && !userDetails?.placeOfWork && <p className="text-red-500 text-sm">{error.placeOfWork}</p>}
            <div className="flex items-center space-x-4">
              <label htmlFor="jobTitle" className="w-48 ">Job Title:</label>
              <input
                type="text"
                id="jobTitle"
                value={documents.jobTitle}
                onChange={(e) => {
                  setDocuments({ ...documents, jobTitle: e.target.value })
                  setError({...error, jobTitle:''})
                
                }}
                disabled={userDetails?.jobTitle}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
                placeholder="Enter your job title"
              />
            </div>
            {error.jobTitle && !userDetails?.jobTitle && <p className="text-red-500 text-sm">{error.jobTitle}</p>}
            <div className="flex items-center space-x-4">
              <label htmlFor="jobType" className="w-48 ">Job Type:</label>
              <input
                type="text"
                id="jobType"
                value={documents.jobType}
                onChange={(e) => {
                  setDocuments({ ...documents, jobType: e.target.value })
                  setError({...error, jobType:''})
                
                }}
                disabled={userDetails?.jobType}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-600  focus:ring-opacity-50"
                placeholder="Enter your job type"
              />
            </div>
            {error.jobType && !userDetails?.jobType && <p className="text-red-500 text-sm">{error.jobType}</p>}
          </div>

          <button
            type="submit"
            className="mt-6 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-500"
          >
            Update Profile
          </button>
        </form>
      </div>
      {}
    </div>
  );
};

export default UpdateDocuments;

