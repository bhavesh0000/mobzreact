import React from "react"
import Task from './Task'
import { useDrop } from "react-dnd"
const TaskList = ({ title, tasks, onDragStart, listName }) => {
    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item) =>{
            onDragStart(item.id, listName)
        }
    })
    return(
        <div className="task-list" ref={drop}>
            <h3>{title}</h3>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDragStart={onDragStart} />
           ))}
        </div>
    )
}
export default TaskList