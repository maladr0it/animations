import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import './Queue.css';

const Queue = (props) => (
  <Droppable droppableId={props.id} type="PERSON">
    {(provided, snapshot) =>  (
      <div
        ref={provided.innerRef}
        style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
        className='queue'
      >
        {props.children}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default Queue;