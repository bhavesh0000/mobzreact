import React from "react"
import { useDrag } from "react-dnd"
const Task = ({ task, onDragStart }) =>{
    const [, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id },
    })
    return(
        <div 
        className="task"
        ref={drag}
        >
            {task.text}
        </div>
    )
}
export default Task