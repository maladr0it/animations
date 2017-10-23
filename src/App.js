import React, { Component } from 'react';
import Queue from './components/Queue';
import QueueItem from './components/QueueItem';
import './App.css';

import { DragDropContext} from 'react-beautiful-dnd';

// moves element from startIndex to endIndex
const reorder = (list, startIndex, endIndex) => {
  let result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

class App extends Component {
  state = {
    lists: {
      list1: [
        { id: '1', name: 'one' },
        { id: '2', name: 'two' },
        { id: '3', name: 'three' },
        { id: '4', name: 'four' },
        { id: '5', name: 'five' }
      ],
      list2: [
        { id: '6', name: 'six' },
        { id: '7', name: 'seven'}
      ]
    }
  };
  onDragStart = (initial) => {
  };
  onDragEnd = (result) => {
    // moving to invalid destination
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    let sourceList = this.state.lists[source.droppableId];
    let destinationList = this.state.lists[destination.droppableId];
    // moving within the same list
    if (source.droppableId === destination.droppableId) {
      sourceList = reorder(
        sourceList,
        source.index,
        destination.index
      );
      const lists = {
        ...this.state.lists,
        [source.droppableId]: sourceList
      }
      this.setState({ lists });
    } else {
      // moving to a different list
      // remove from original, insert into new
      const [value] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, value);
      const lists = {
        ...this.state.lists,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destinationList
      }
      this.setState({ lists })
    }
  };

  render() {
    const list1 = this.state.lists.list1.map(item => (
      <QueueItem key={item.id} id={item.id} title={item.name} />
    ));
    const list2 = this.state.lists.list2.map(item => (
      <QueueItem key={item.id} id={item.id} title={item.name} />
    ));

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        className='listContainer'
      >
        {this.state.lists.list1.length}
        {this.state.lists.list2.length}
        <div className='queueContainer'>
          <Queue id='list1'>
            {list1}
          </Queue>
          <Queue id='list2'>
            {list2}
          </Queue>
        </div>
      </DragDropContext>
    );
  }
}

export default App;
