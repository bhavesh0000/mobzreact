import React, { useState } from 'react'
import Print from './tasks';
import Block from './Block';

const initialTasks = [
  { id: 'task1', content: 'Task 1' },
  { id: 'task2', content: 'Task 2' },
  { id: 'task3', content: 'Task 3'},
    { id: 'task4', content: 'Task 4'},
    { id: 'task5', content: 'Task 5'},
    { id: 'task6', content: 'Task 6'},
    { id: 'task7', content: 'Task 7'},
    { id: 'task8', content: 'Task 8'},
    { id: 'task9', content: 'Task 9'},
    { id: 'task10', content: 'Task 10'},
  // ... add more tasks
];

const Task = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const onTaskDrop = (taskId, targetBlock) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, block: targetBlock };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const blocks = ['Today', 'Tomorrow', 'This Week', 'Next Week'];

  return (
    <div>
      <h1>Task Board</h1>
      <div style={{ display: 'flex' }}>
        {blocks.map(block => (
          <Block
            key={block}
            name={block}
            tasks={tasks.filter(task => task.block === block)}
            onTaskDrop={onTaskDrop}
          />
        ))}
      </div>
      <div style={{ marginTop: '16px' }}>
        <h2>Unplanned Tasks</h2>
        {tasks
          .filter(task => !task.block)
          .map(task => (
            <Print key={task.id} task={task} />
          ))}
      </div>
    </div>
  );
};

export default Task;


// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
// import './App.css'
// const initialTasks = [
//     { id: 'task1', content: 'Task 1'},
//     { id: 'task2', content: 'Task 2'},
//     { id: 'task3', content: 'Task 3'},
//     { id: 'task4', content: 'Task 4'},
//     { id: 'task5', content: 'Task 5'},
//     { id: 'task6', content: 'Task 6'},
//     { id: 'task7', content: 'Task 7'},
//     { id: 'task8', content: 'Task 8'},
//     { id: 'task9', content: 'Task 9'},
//     { id: 'task10', content: 'Task 10'},
//     { id: 'task11', content: 'Task 11'},
// ]
// const  Task = ()=>{
//     const[tasks, setTasks] = useState(initialTasks)
//     const handleDragEnd = (result) =>{
//         if(!result.destination) return

//         const updatedTasks = [...tasks]
//         const [movedTask] = updatedTasks.splice(result.source.index, 1)
//         updatedTasks.splice(result.destination.index, 0, movedTask)

//         setTasks(updatedTasks)
//     }
//     return(
//         <div className='App'>
//             <h1>Task Board</h1>
//             <DragDropContext onDragEnd={handleDragEnd}>
//                 <div className='blocks-container'>
//                     <div className='block'>
//                         <h2>Today</h2>
//                         <Droppable droppableId="today">
//                             {(provided)=>(
//                                 <div
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 className='task-list'
//                                 ></div>
//                             )}
//                         </Droppable>
//                     </div>
//                     <div className='block'>
//                         <h2>Tomorrow</h2>
//                         <Droppable droppableId="tomorrow">
//                             {(provided)=>(
//                                 <div
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 className="task-list"
//                                 >

//                                 </div>
//                             )}
//                         </Droppable>
//                     </div>
//                     <div className='block'>
//                         <h2>This Week</h2>
//                         <Droppable droppableId="this-week">
//                             {(provided)=>(
//                                 <div
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 className="task-list"
//                                 ></div>
//                             )}
//                         </Droppable>
//                     </div>
//                     <div className='block'>
//                         <h2>Next Week</h2>
//                         <Droppable droppableId="next-week">
//                             {(provided)=>(
//                                 <div
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 className='task-list'
//                                 ></div>
//                             )}
//                         </Droppable>
//                     </div>
//                     <div className='block'>
//                         <h2>Unplanned</h2>
//                         <Droppable droppableId="unplanned">
//                             {(provided)=>(
//                                 <div
//                                 ref={provided.innerRef}
//                                 {...provided.droppableProps}
//                                 className="task-list"
//                                 >
//                                     {tasks.map((task, index)=>(
//                                         <Draggable
//                                         key={task.id}
//                                         draggableId={task.id}
//                                         index={index}
//                                         >
//                                             {(provided)=>(
//                                                 <div
//                                                 ref={provided.innerRef}
//                                                 {...provided.draggableProps}
//                                                 {...provided.dragHandleProps}
//                                                 className='task'
//                                                 >
//                                                     {task.content}
//                                                 </div>
//                                             )}
//                                         </Draggable>
//                                     ))}
//                                     {provided.placeholder}
//                                 </div>
//                             )}
//                         </Droppable>
//         </div>
//         </div>
//         </DragDropContext>
//         </div>
//     )
// }
// export default Task