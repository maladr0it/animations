import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './QueueItem.css';
import pokeApi from '../pokeApi';

const styles = {
  dragging: {
    backgroundColor: '#E36588',
    transition: 'ease 1s'
  }
}

const ItemContent = (props) => (
  <div
    style={
      (props.isDragging) ? styles.dragging : {}
    }
    className='queueItem'
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
              <img src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+props.id+'.png'} />
            </ItemContent>
          </div>
          {provided.placeholder}
      </div>
    );
  }}  
  </Draggable>
);
export default QueueItem;