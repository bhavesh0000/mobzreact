import React, { useState } from "react"
function Login2({ onLogin }) {
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () =>{
        if (userId === 'admin' && password === 'password123'){
            onLogin()
        } else{
            alert('Invalid credentials')
        }
    }
    return(
        <div>
            <input placeholder="UserID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )}
    export default Login2