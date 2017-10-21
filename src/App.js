import React, { Component } from 'react';
import Queue from './components/Queue';
import QueueItem from './components/QueueItem';
import './App.css';

import { DragDropContext} from 'react-beautiful-dnd';

const reorder = (list, startIndex, endIndex) => {
  let result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

class App extends Component {
  state = {
    items: [
      { id: '1', name: 'one' },
      { id: '2', name: 'two' },
      { id: '3', name: 'three' },
      { id: '4', name: 'four' },
      { id: '5', name: 'five' },
      { id: '6', name: 'six' },
    ]
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
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );
    this.setState({ items });
  };

  render() {
    const queueItems = this.state.items.map(item => (
      <QueueItem key={item.id} id={item.id} title={item.name} color={item.color} />
    ));

    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
      >
        <button onClick={() => this.addItem({ id: '55', name: 'SOK' })}>CLICK</button>
        <Queue id='1'>
          {queueItems}
        </Queue>
        <Queue id='2'>
          <div>hi</div>
        </Queue>
      </DragDropContext>
    );
  }
}

export default App;
