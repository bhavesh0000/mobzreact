import React, { useState } from 'react'
import './App.css'
function App() {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [sum, setSum] = useState(0)

  const handleCalculate = ()=>{
    setSum(num1 + num2)
  }
  return(
    <div>
      <h1>Sum of Two Numbers</h1>
      <input 
        type="number"
        value={num1}
        onChange={(e)=>setNum1(parseInt(e.target.value))}
        />
        <input 
        type="number"
        value={num2}
        onChange={(e)=>setNum2(parseInt(e.target.value))}
        />
        <button onClick={handleCalculate}>Calculate</button>
        <p>Sum: {sum} </p>
    </div>
  )}
export default App;
