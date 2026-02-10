import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../services/authServices";


const Profile = () => {
  
  const navigate = useNavigate();
  const[user,setUser] = useState(null);


  useEffect(()=>{
    const fetchProfile = async () =>{
      try{
        const data = await getProfile();
        setUser(data);
      }catch(error){
        //Token Invalid Error or Expired
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchProfile();
  },[navigate]);

  if(!user){
    return (
      <div className="text-center mt-10 text-blue-500 text-2xl">Loading.......</div>
    )
  }


  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-96">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>

          <p>
            <strong>Name:</strong>
            {user.name}
          </p>
          <p>
            <strong>Email:</strong>
            {user.email}
          </p>
          <p>
            <strong>Role:</strong>
            {user.role}
          </p>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="mt-4 w-full bg-red-500 text-white p-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
  );
};

export default Profile;