import React from 'react';
import { useDrop } from 'react-dnd';

const Block = ({ name, tasks, onTaskDrop }) => {
  const [, ref] = useDrop({
    accept: 'TASK',
    drop: (item) => onTaskDrop(item.id, name),
  });

  return (
    <div ref={ref} style={{ border: '2px dashed #000', padding: '16px', marginTop: '16px' }}>
      <h2>{name}</h2>
      {tasks.map(task => (
        <div key={task.id} style={{ margin: '8px' }}>
          {task.content}
        </div>
      ))}
    </div>
  );
};

export default Block;
