import React, { useState } from 'react'
import { DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import TaskList from './TaskList'
import './App.css'

const App1 = () =>{
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Task 1', list: 'unplanned' },
        { id: 2, text: 'Task 2', list: 'unplanned' },
        { id: 3, text: 'Task 3', list: 'unplanned' },
        { id: 4, text: 'Task 4', list: 'unplanned' },
        { id: 5, text: 'Task 5', list: 'unplanned' },
        { id: 6, text: 'Task 6', list: 'unplanned' },
        { id: 7, text: 'Task 7', list: 'unplanned' },
        { id: 8, text: 'Task 8', list: 'unplanned' },
        { id: 9, text: 'Task 9', list: 'unplanned' },
        { id: 10, text: 'Task 10', list: 'unplanned' },
    ]) 
    const moveTask = (taskId, newList) =>{
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, list: newList }
            }
            return task
        })
        setTasks(updatedTasks)
    }
    return(
        <DndProvider backend={HTML5Backend}>
            <div className='app1'>
                <TaskList title="Today" tasks={tasks.filter(task => task.list === 'today')} onDragStart={moveTask} listName="today" />
                <TaskList title="Tomorrow" tasks={tasks.filter(task => task.list === 'tomorrow')} onDragStart={moveTask} listName="tomorrow" />
                <TaskList title="This Week" tasks={tasks.filter(task => task.list === 'thisWeek')} onDragStart={moveTask} listName="thisWeek" />
                <TaskList title="Next Week" tasks={tasks.filter(task => task.list === 'nextWeek')} onDragStart={moveTask} listName="nextWeek" />
                <TaskList title="Unplanned" tasks={tasks.filter(task => task.list === 'unplanned')} onDragStart={moveTask} listName="unplanned" />
            </div>
        </DndProvider>
    )
}
export default App1