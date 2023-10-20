import React, { useState } from "react"
import Login2 from "./login2"
import Dashboard from "./Dashboard"
function App3() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    if(!isLoggedIn) {
        return <Login2 onLogin={() => setIsLoggedIn(true)} />
    }
    return <Dashboard />
}
export default App3