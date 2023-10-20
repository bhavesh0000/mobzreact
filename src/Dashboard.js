import React, { useState } from "react"
import DataGrid from "./DataGrid"
function Dashboard() {
    const [activeMenu, setActiveMenu] = useState(null)

    const dataSources = {
        'Users': [
            { email: 'test@example.com', password: 'password123', signupTime: '2022-01-01 10:00:00', ip: '192.168.1.1'}
        ],
        'Task Lists': [
            { title: 'My Task List', createdBy: 'test@example.com', noOfTasks: 5, creationTime: '2022-01-01 10:00:00', lastUpdated: '2022-01-02 10:00:00' }
            // ... other task lists
          ],
          'Tasks': [
            { title: 'Sample Task', description: 'This is a sample task', taskListTitle: 'My Task List', createdBy: 'test@example.com', creationTime: '2022-01-01 10:00:00' }
            // ... other tasks
          ]
    }
    return(
        <div>
            <button onClick={() => setActiveMenu('Users')}>Users</button>
            <button onClick={() => setActiveMenu('Task Lists')}>Task Lists</button>
      <button onClick={() => setActiveMenu('Tasks')}>Tasks</button>
      {activeMenu && <DataGrid dataSource={dataSources[activeMenu]} type={activeMenu} />}
        </div>
    )}
    export default Dashboard