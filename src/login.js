import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { auth } from './firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log('User logged in successfully')
      navigate('/todolist')
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
        <h2>Login page</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;
