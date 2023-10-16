import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import SignUp from "./signup"
import Login from "./login"
import TodoList from "./TodoApp"
import { auth } from './firebaseConfig'

function AuthRouter (){
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) =>{
            setUser(authUser)
            if(!authUser){
                navigate("/login")
            }
        })
        return () =>{
            unsubscribe()
        }
    }, [navigate])
      return(
        <div className="App2">
            <h1>Firebase Authentication</h1>
            <Routes>
                <Route path="*" element={<SignUp />}/>
                <Route path="/login" element={<Login />} />
                {user ? (
                    <Route path="/todolist" element={<TodoList user={user}/>} />
                        
                ) : (
                    <>
                    <Route path="*" element={<SignUp />}/>
                    </>
                )}
            </Routes>
        </div>
      )
}
function App2(){
    return(
        <Router>
            <AuthRouter />
        </Router>
    )
}
export default App2