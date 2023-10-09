import React from 'react';
import { useDrag } from 'react-dnd';

const Print = ({ task }) => {
  const [, ref] = useDrag({
    type: 'TASK',
    item: { id: task.id, content: task.content }
  })

  return (
    <div ref={ref} style={{ border: '1px solid #ccc', padding: '8px', margin: '8px', cursor: 'move' }}>
      {task.content}
    </div>
  );
};

export default Print;
