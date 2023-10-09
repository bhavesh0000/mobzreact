import React, { useState } from "react"
import './App.css'
function Filter(){
    const [searchTerm, setSearchTerm] = useState('')
    const [data] = useState([
        'Apple',
        'Banana',
        'Cherry',
        'Date',
        'Eggplant',
        'Fig',
        'Mango',
        'Orange',
        'Pear',
        'Pineapple',
        'Strawberry',
        'Watermelon',
        'Grapes',
    ])
    const filteredData = data.filter((item)=>
    item.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
    }
    return(
        <div className="Filter">
            <h1>Filter App</h1>
            <input 
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleInputChange}
            />
            <ul>
                {filteredData.map((item, index)=>(
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
export default Filter
