// import React, { useState } from 'react'
// import './App.css'
// function App() {
//   const [num1, setNum1] = useState(0)
//   const [num2, setNum2] = useState(0)
//   const [sum, setSum] = useState(0)

//   const handleCalculate = ()=>{
//     setSum(num1 + num2)
//   }
//   return(
//     <div>
//       <h1>Sum of Two Numbers</h1>
//       <input 
//         type="number"
//         value={num1}
//         onChange={(e)=>setNum1(parseInt(e.target.value))}
//         />
//         <input 
//         type="number"
//         value={num2}
//         onChange={(e)=>setNum2(parseInt(e.target.value))}
//         />
//         <button onClick={handleCalculate}>Calculate</button>
//         <p>Sum: {sum} </p>
//     </div>
//   )}
// export default App;
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [blocks, setBlocks] = useState([
    {
      id: "today",
      title: "Today",
    },
    {
      id: "tomorrow",
      title: "Tomorrow",
    },
    {
      id: "this-week",
      title: "This Week",
    },
    {
      id: "next-week",
      title: "Next Week",
    },
    {
      id: "unplanned",
      title: "Unplanned",
    },
  ]);

  const [tasks, setTasks] = useState([
    {
      id: "1",
      text: "Task 1",
      blockId: "unplanned",
    },
    {
      id: "2",
      text: "Task 2",
      blockId: "unplanned",
    },
    {
      id: "3",
      text: "Task 3",
      blockId: "unplanned",
    },
    {
      id: "4",
      text: "Task 4",
      blockId: "unplanned",
    },
    {
      id: "5",
      text: "Task 5",
      blockId: "unplanned",
    },
    {
      id: "6",
      text: "Task 6",
      blockId: "unplanned",
    },
    {
      id: "7",
      text: "Task 7",
      blockId: "unplanned",
    },
    {
      id: "8",
      text: "Task 8",
      blockId: "unplanned",
    },
    {
      id: "9",
      text: "Task 9",
      blockId: "unplanned",
    },
    {
      id: "10",
      text: "Task 10",
      blockId: "unplanned",
    },
  ]);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const handleDrop = (event) => {
    const taskId = event.dataTransfer.getData("text/plain");
    const task = tasks.find((task) => task.id === taskId);
    const newBlockId = event.target.id;

    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            blockId: newBlockId,
          };
        }

        return task;
      });
    });
  };

  return (
    <div className="app">
      {blocks.map((block) => (
        <div
          key={block.id}
          className="block"
          id={block.id}
          onDrop={handleDrop}
        >
          <h2>{block.title}</h2>
          {tasks.filter((task) => task.blockId === block.id).map((task) => (
            <div
              key={task.id}
              className="task"
              id={task.id}
              draggable
              onDragStart={handleDragStart}
            >
              {task.text}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;

