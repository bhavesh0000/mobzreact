import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './firebaseConfig'
import { auth } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// import {  createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, addDoc, collection } from 'firebase/firestore'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const db = getFirestore()
  const userCollection = collection(db, 'users')
  

  const handleSignUp = async () => {
    try {
     const userCredential =  await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      await addDoc(userCollection, {
        uid: user.uid,
        email: user.email,
     })
     navigate('/login')
     console.log('User signed up successfully', userCredential.user.uid)
    } catch (error) {
      console.error(error.message);
    } }
  return (
    <div>
        <h2>Signup page</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}
export default SignUp;
