import React, { Component } from 'react';
import Queue from './components/Queue';
import QueueItem from './components/QueueItem';
import './App.css';

import { DragDropContext} from 'react-beautiful-dnd';

// moves element from startIndex to endIndex
const reorder = (list, startIndex, endIndex) => {
  let result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

class App extends Component {
  state = {
    rng: [],
    lists: {
      list1: [], list2: [], list3: [], list4: [], list5: []
    }
  }
  componentWillMount = () => {
    let rng = Array.from(Array(151), (v, i) => i + 1)
    .sort(() => Math.random() - 0.5);

    // this is ugly
    let lists = this.state.lists;
    Object.keys(lists).forEach(listId => {
      lists[listId] = rng.splice(0, 6).map(num => (
        {
          id: num,
          size: Math.floor(Math.random()*3) + 1
        }
      ))
    });
  }
  onDragStart = (initial) => {
  };
  // try to not destroy/create object in order to persist css
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
    const lists = Object.keys(this.state.lists).map(listId => (
      <Queue key={listId} id={listId}>
        {this.state.lists[listId].map(item => (
          <QueueItem key={item.id} {...item} />
        ))}
      </Queue>
    ));

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        className='listContainer'
      >
        <div className='queueContainer'>
          {lists}
        </div>
      </DragDropContext>
    );
  }
}
export default App;
