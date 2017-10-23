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

  addItem = (item) => {
    const items = this.state.items;
    items.push(item);
    this.setState({items});
  }
  onDragStart = (initial) => {
  };
  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    const sourceList = this.state.lists[source.droppableId];
    const destinationList = this.state.lists[destination.droppableId];
    // moving within the same list
    if (source.droppableId == destination.droppableId) {
      const reOrdered = reorder(
        sourceList,
        source.index,
        destination.index
      );
      const lists = {
        ...this.state.lists,
        [source.droppableId]: reOrdered
      }
      this.setState({ lists });
    }
    // moving to a different list
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
      >
        <button onClick={() => this.addItem({ id: '55', name: 'SOK' })}>CLICK</button>
        <Queue id='list1' style={{ display: 'inline' }}>
          {list1}
        </Queue>
        <Queue id='list2'>
          {list2}
        </Queue>
      </DragDropContext>
    );
  }
}

export default App;
