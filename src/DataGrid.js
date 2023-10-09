import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TextField, Paper, IconButton } from '@mui/material';
import { Check, Close} from '@mui/icons-material'
import jsonData from './Data';

function DataGrid() {
    const [data, setData] = useState(jsonData)
    const [searchTerm, setSearchTerm] = useState('')

    const handleSort = (columnName) => {
        const sortedData = [...data].sort((a, b)=> a[columnName].localeCompare(b[columnName]))
        setData(sortedData)
    }
    const handleSearch = (e) => {
        const searchValue = e.target.value
        setSearchTerm(searchValue)
        const filteredData = jsonData.filter((entry)=>
        Object.values(entry).some((value) =>
            value.toString().toLowerCase().includes(searchValue.toLowerCase())
        )
        )
        setData(filteredData)
    }
    return(
        <div>
            <TextField
            label="Search"
            variant='outlined'
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell onClick={()=> handleSort('Customer')}>Customer</TableCell>
                            <TableCell onClick={()=> handleSort('Last seen')}>Last seen</TableCell>
                            <TableCell onClick={()=> handleSort('Orders')}>Orders</TableCell>
                            <TableCell onClick={()=> handleSort('Total spent')}>Total spent</TableCell>
                            <TableCell onClick={()=> handleSort('Latest purchase')}>Latest purchase</TableCell>
                            <TableCell>News</TableCell>
                            <TableCell>Segments</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((entry, index)=>(
                            <TableRow key={index}>
                                <TableCell>{entry.Customer}</TableCell>
                                <TableCell>{entry['Last seen']}</TableCell>
                                <TableCell>{entry.Orders}</TableCell>
                                <TableCell>{entry['Total spent']}</TableCell>
                                <TableCell>{entry['Latest purchase']}</TableCell>
                                <TableCell>
                                {entry.News === 'Regular' ? (
                                        <IconButton color="success">
                                            <Check />
                                        </IconButton>
                                    ) : (
                                        <IconButton color="error">
                                            <Close />
                                        </IconButton>
                                    )}
                                </TableCell>
                                <TableCell>{entry.Segments}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
export default DataGrid