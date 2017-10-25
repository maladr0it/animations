import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './QueueItem.css';
import pokeApi from '../pokeApi';


// item is sometimes re-rendering
const ItemContent = (props) => (
  <div
    className={`
      queueItem
      ${props.isDragging ? 'dragging' : 'notDragging'}
    `}
  >
    {props.children}
  </div>
)

const QueueItem = (props) => (
  <Draggable draggableId={props.id} type="PERSON">
    {(provided, snapshot) => {
      return (
        <div>
          <div
            ref={provided.innerRef}
            style={provided.draggableStyle}
            {...provided.dragHandleProps}  
          >
            <ItemContent isDragging={snapshot.isDragging}>
              {props.id}
              {/* <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+props.id+'.png'} /> */}
            </ItemContent>
          </div>
          {provided.placeholder}
      </div>
    );
  }}  
  </Draggable>
);
export default QueueItem;