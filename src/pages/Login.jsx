import React, { useEffect, useState } from 'react';
import Home from './Home';
import Personal from './Personal';
import instance from "../lib/api";


const Login = () => {
    // add userID to check if user is new
  const [newUser, setNewUser] = useState(false);
  const deviceId = localStorage.getItem("deviceId");
  const userId = localStorage.getItem("userId");

  const getAndVerifyUserProfile = async () => {
    const response = await instance.get("/archers/" + userId);
    const { data } = response;
    if (data.device_id !== deviceId) {
      setNewUser(true);
    }
  }

  useEffect(() => {
    if (!deviceId || !userId || deviceId === "" ||userId === "") {
      setNewUser(true);
    } else if (userId && deviceId) {
      getAndVerifyUserProfile();
    }
  }, []);    

  return (
    newUser ? <Personal isRegistration={true} /> : <Home />
  );
}

export default Login;