import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './Queue.css';

// when queue is empty the container isn't formatted
const Queue = (props) => (
  <Droppable droppableId={props.id} type="PERSON">
    {(provided, snapshot) =>  (
      <div
        ref={provided.innerRef}
        className={`
          queue
          ${snapshot.isDraggingOver ? 'draggingOver' : ''}
        `}
      >
        {props.children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default Queue;