import React, { useEffect, useState } from 'react';
import Home from './Home';
import Personal from './Personal';
import { v4 } from 'uuid';

const Login = () => {
    // add userID to check if user is new
  const [newUser, setNewUser] = useState(false);

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      localStorage.setItem("deviceId", v4());
      setNewUser(true);
    }
  }, []);

  return (
    newUser ? <Personal  isRegistration={true} /> : <Home />
  );
}

export default Login;