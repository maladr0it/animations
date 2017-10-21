import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './QueueItem.css';

const QueueItem = (props) => (
  <Draggable draggableId={props.id} type="PERSON">
    {(provided, snapshot) => {
      const style = {
        ...provided.draggableStyle,
        backgroundColor: snapshot.isDragging ? 'orange' : ''
      };
      return (
        <div>
          <div
            ref={provided.innerRef}
            style={style}
            {...provided.dragHandleProps}  
            className='queueItem'
          >
            {props.title}
          </div>
          {provided.placeholder}
      </div>
    );
  }}  
  </Draggable>
);


export default QueueItem;