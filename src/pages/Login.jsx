import React, { useEffect, useState } from 'react';
import Home from './Home';
import Personal from './Personal';


const Login = () => {
    // add userID to check if user is new
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");
    const userId = localStorage.getItem("userId");
    if (!deviceId || userId === "") {
      setNewUser(true);
    }
  }, []);

  return (
    newUser ? <Personal isRegistration={true} /> : <Home />
  );
}

export default Login;