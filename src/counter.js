import React, { useState } from "react";
import './App.css'
function Count() {
    const [counter, setCounter] = useState(0)
        const increaseCounter = ()=>{
            setCounter(counter + 1)
        }
        const decreaseCounter = () => {
            setCounter(counter - 1)  
         }
         return (
            <div className="App">
                <h1>Counter App</h1>
                <p>Counter value: {counter}</p>
                <button onClick={increaseCounter}>Increase</button>
                <button onClick={decreaseCounter}>Decrease</button>
            </div>
         )
    }
export default Count