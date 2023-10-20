import React, { useEffect, useState, useCallback, useRef } from 'react';
import { getFirestore, doc, setDoc, collection, getDocs, where, query, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth } from './firebaseConfig';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const db = getFirestore();
const PRIORITY_ORDER = ['High', 'Medium', 'Low'];

const getTaskColor = (priority) => {
    switch (priority) {
        case 'High': return 'red';
        case 'Medium': return 'yellow';
        case 'Low': return 'green';
        default: return 'white';
    }
};

const Task = ({ task, index, moveTask, handleDeleteTask, tasks }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'TASK',
        hover: (draggedItem, monitor) => {
            if (draggedItem.id !== task.id) {
                const draggedIndex = tasks.findIndex(t => t.id === draggedItem.id)
                if (draggedIndex < 0) return
                const targetRect = ref.current.getBoundingClientRect()
                const hoverClientY = monitor.getClientOffset().y - targetRect.top
                if(draggedIndex < index && hoverClientY < targetRect.height / 2){
                    return
                }
                if (draggedIndex > index && hoverClientY > targetRect.height / 2){
                    return
                }
                moveTask(draggedItem.id, task.listId, undefined, index);
            }
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'TASK',
        item: { id: task.id, listId: task.listId },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                moveTask(item.id, dropResult.listId, dropResult.priorityZone);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, border: '1px solid black', marginBottom: '10px', backgroundColor: getTaskColor(task.priority) }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priority}</p>
            <button onClick={() => handleDeleteTask(task.id)}>Delete Task</button>
        </div>
    );
};

const TaskList1 = ({ list, tasks, moveTask, handleDeleteList, handleDeleteTask }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => {
            if(item.listId !== list.id){
                moveTask(item.id, list.id, undefined, tasks.length)
            }
        }
    });

    drop(ref);

    return (
        <div ref={ref} style={{ display: 'block', justifyContent: 'space-evenly', border: '2px solid black', padding: '10px', width: '250px' }}>
            <h2>{list.name}</h2>
            <button onClick={() => handleDeleteList(list.id)}>Delete List</button>
            {tasks.filter(task => task.listId === list.id).map((task, index) => (
                <Task key={task.id} index={index} task={task} moveTask={moveTask} handleDeleteTask={handleDeleteTask} tasks={tasks} />
            ))}
        </div>
    );
};

function TodoList() {
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [activeListId, setActiveListId] = useState(null);
    const [listName, setListName] = useState("");
    const [taskTitle, setTaskTitle] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");
    const [taskPriority, setTaskPriority] = useState("Medium");

    useEffect(() => {
        const fetchListAndTasks = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const listSnapshot = await getDocs(collection(db, 'lists'));
            const userLists = listSnapshot.docs.filter(doc => doc.data().userId === user.uid);
            setLists(userLists.map(doc => ({ id: doc.id, ...doc.data() })));
            if (userLists.length === 1){
                setActiveListId(userLists[0].id)
            }
            const taskQuery = query(collection(db, 'tasks'), where("userId", "==", user.uid));
            const taskSnapshot = await getDocs(taskQuery);
            const userTasks = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTasks(userTasks);
        };

        fetchListAndTasks();
    }, []);
    const PriorityZone = ({ priority, tasks, moveTask }) => {
        const ref = useRef(null);
    
        const [, drop] = useDrop({
            accept: 'TASK',
            drop: (item) => {
                return { priorityZone: priority, listId: activeListId }
            }
        });
    
        drop(ref);
    
        return (
            <div ref={ref} style={{ height: '150px', border: '1px dashed gray', backgroundColor: getTaskColor(priority) }}>
                <h4>Drag here for {priority} priority</h4>
            </div>
        );
    };
    

    const moveTask = useCallback(async (taskId, targetListID, priorityZone, targetIndex) => {
        const draggedTask = tasks.find(t => t.id === taskId);
    if (!draggedTask) {
        console.error("Could not find task with ID:", taskId);
        return;
    }

    draggedTask.listId = targetListID || draggedTask.listId;

    if (priorityZone) {
        draggedTask.priority = priorityZone;
    }
    if(typeof targetIndex !== "undefined"){
        const reorderedTasks = [...tasks]
        reorderedTasks.splice(tasks.findIndex(t => t.id === taskId), 1)
        reorderedTasks.splice(targetIndex, 0, draggedTask)
        setTasks(reorderedTasks)
    }

    const taskRef = doc(db, 'tasks', draggedTask.id);
    await updateDoc(taskRef, { listId: draggedTask.listId, priority: draggedTask.priority });
    }, [tasks]);

    const handleDeleteList = useCallback(async (listId) => {
        if (!listId) {
            console.error("List ID is undefined or null.");
            return;
        }

        await deleteDoc(doc(db, 'lists', listId));

        setLists(prevLists => prevLists.filter(list => list.id !== listId));
    }, []);

    const handleDeleteTask = useCallback(async (taskId) => {
        await deleteDoc(doc(db, 'tasks', taskId));

        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }, []);

    const handleAddList = useCallback(async () => {
        const user = auth.currentUser;
        if (!user) return;
        if(!listName.trim()){
            alert('Please enter a valid list name.')
            return
        }

        const newList = {
            userId: user.uid,
            name: listName
        };

        const newDocRef = doc(collection(db, 'lists'));
        await setDoc(newDocRef, newList);

        setLists(prevLists => {
            const updatedLists = [...prevLists, { id: newDocRef.id, ...newList }]
            if (updatedLists.length === 1){
                setActiveListId(newDocRef.id)
            }
            return updatedLists
        })
        setListName('');
    }, [listName, lists]);

    const handleAddTask = useCallback(async () => {
        const user = auth.currentUser;
        if (!user || !activeListId){
            alert("Please select a list before adding a task.")
            return
        }
        if(!taskTitle.trim() || !taskDescription.trim() || !taskDueDate.trim() || !taskPriority.trim()){
            alert('Please enter a valid task.')
            return
        }
        const newTask = {
            userId: user.uid,
            listId: activeListId,
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
            priority: taskPriority
        };

        const newDocRef = doc(collection(db, 'tasks'));
        await setDoc(newDocRef, newTask);

        setTasks([...tasks, { id: newDocRef.id, ...newTask }]);
        setTaskTitle('');
        setTaskDescription('');
        setTaskDueDate('');
        setTaskPriority('Medium');
    }, [activeListId, taskTitle, taskDescription, taskDueDate, taskPriority, tasks]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <div>
                    <input value={listName} onChange={e => setListName(e.target.value)} placeholder="List Name" />
                    <button onClick={handleAddList}>Add List</button>
                </div>
                <div>
                    <select value={activeListId || ""} onChange={e => setActiveListId(e.target.value)}>
                        <option value="" disabled>Select a list</option>
                        {lists.map(list => (
                            <option key={list.id} value={list.id}>{list.name}</option>
                        ))}
                    </select>
                    <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Task Title" />
                    <textarea value={taskDescription} onChange={e => setTaskDescription(e.target.value)} placeholder="Task Description" />
                    <input type="date" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)} />
                    <select value={taskPriority} onChange={e => setTaskPriority(e.target.value)}>
                        {PRIORITY_ORDER.map(priority => (
                            <option key={priority} value={priority}>{priority}</option>
                        ))}
                    </select>
                    <button onClick={handleAddTask}>Add Task</button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '20px' }}>
                    {PRIORITY_ORDER.map(p => (
                        <PriorityZone key={p} priority={p} tasks={tasks} moveTask={moveTask} />
                    ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto', marginTop: '20px'}}>
                    {lists.map(list => (
                       <div style={{ display: 'grid'}}>
                        <TaskList1
                            key={list.id}
                            list={list}
                            tasks={tasks}
                            moveTask={moveTask}
                            handleDeleteList={handleDeleteList}
                            handleDeleteTask={handleDeleteTask}
                        />
                       </div>
                    ))}
                </div>
            </div>
        </DndProvider>
    );
}

export default TodoList;

 
