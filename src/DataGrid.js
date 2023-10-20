import React from 'react';

function DataGrid({ dataSource, type }) {
  const renderHeaders = () => {
    if (type === 'Users') {
      return (
        <>
          <th>Email ID</th>
          <th>Password</th>
          <th>Signup Time</th>
          <th>IP</th>
        </>
      );
    } else if (type === 'Task Lists') {
      return (
        <>
          <th>Task List Title</th>
          <th>Create By</th>
          <th>No of Tasks</th>
          <th>Creation Time</th>
          <th>Last Updated</th>
        </>
      );
    } else {
      return (
        <>
          <th>Task Title</th>
          <th>Task Description</th>
          <th>Task List Title</th>
          <th>Create By</th>
          <th>Creation Time</th>
        </>
      );
    }
  };

  return (
    <table>
      <thead>
        <tr>{renderHeaders()}</tr>
      </thead>
      <tbody>
        {dataSource.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataGrid;
