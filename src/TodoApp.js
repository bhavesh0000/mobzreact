import React, { useEffect, useState } from 'react'
import { getFirestore, doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { auth } from './firebaseConfig';
import { useDrag, useDrop, DndProvider} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function DraggableTask({ task, moveTask, index }){
    const [, ref] = useDrag({
        type: 'TASK',
        item: { task, index }
    })
    const [, drop] = useDrop({
        accept: 'TASK',
        hover: (draggedItem) => {
            if (draggedItem.index !== index){
                moveTask(draggedItem.index, index)
                draggedItem.index = index
            }
        }
    })
    return(
        <div ref={(node) => ref(drop(node))}>
            {task.title}
            {task.taskDescription}
            {task.taskDueDate}
            {task.taskPriority}
        </div>
    )
}
const db = getFirestore()
const TodoList = ({user}) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [tasks, setTasks] = useState([])
    const moveTask = (fromIndex, toIndex) => {
        const updatedTasks = [...tasks]
        const [movedTask] = updatedTasks.splice(fromIndex, 1)
        updatedTasks.splice(toIndex, 0, movedTask)
        setTasks(updatedTasks)
    }
    
    useEffect(() =>{
        const fetchTasks = async () => {
            const taskCollection = collection(db, 'tasks')
            const taskSnapshot = await getDocs(taskCollection)
            const tasksData = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}))
            setTasks(tasksData)
        }
        fetchTasks()
    }, [])
    const handleAddTask = async (e) => {
        e.preventDefault()
        try {
            const user = auth.currentUser
            if(!user) {
                console.error('User not authenticated.')
                return
            }
            const taskCollection = collection(db, 'tasks')
            const newTaskDoc = doc(taskCollection)
            const taskData = {
                userId: user.uid,
                title: taskTitle,
                description: taskDescription,
                dueDate: taskDueDate,
                priority: taskPriority,
            }
            await setDoc(newTaskDoc, taskData)
            console.log('Task added successfully')
            const newTask = {
                id: newTaskDoc.id,
                ...taskData
            }
            setTasks(prevTasks => [...prevTasks, newTask])
        }
        catch (error) {
            console.error('Error adding task:', error)
        }
        
    }
  
    // Add logic to save tasks to Firebase when the user adds a new task
  
    return (
        <DndProvider backend={HTML5Backend}>
      <div>
        <h2>To-Do List</h2>
        <form onSubmit={handleAddTask}>
          <input type="text" placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
          <textarea placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
          <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
          <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button type='submit'>Add Task</button>
        </form>
           {tasks.map((task, index) =>(
            <DraggableTask key={task.id} task={task} moveTask={moveTask} index={index}/>
           ))}
      </div>
      </DndProvider>
    );
  };
  
  export default TodoList;
 
