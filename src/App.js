import './App.css';
import React from 'react';
import { render } from '@testing-library/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Puzzle 
        containerArray={[1, 1, 1, 2, 2, 1, 2, 2, 2]}
        solutionArray={[0, 0, 0, 0, 0, 1, 1, 1, 1]}
        size={3}
        />
      </header>
    </div>
  );
}

class Puzzle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: this.props.size,
      containers: this.props.containerArray,
      solution: this.props.solutionArray,
      squareValues: Array(this.props.solutionArray.length).fill(false),
    };
    console.log(this.state);
  }
  render() {
    const rows = [];
    for (let i = 0; i < this.state.size; i++) {
      rows.push(this.renderRow(i));
    }
    return (
      <div className="puzzle-board">
        {rows}
      </div>
    )
  }
  renderRow(n) {
    const cells = [];
    for (let i = (this.state.size * n); i < (this.state.size * (n + 1)); i++) {
      cells.push(this.renderCell(i));
    }
    return (
      <div className="puzzle-row" key={n}>
        {cells}
      </div>
    );
  }

  renderCell(n) {
    return (
      <div className="puzzle-square" key={n}>{this.state.containers[n]}</div>
    );
  }
}

function getRow(n, array) {
  // gets the nth row of a provided (square) array
  const size = Math.sqrt(array.length);
  return array.slice((size * n), (size * (n + 1)));
}

function getColumn(n, array) {
  // gets the nth column of a provided (square) array
  const size = Math.sqrt(array.length);
  const col = [];
  array.forEach(entry => {
    if (entry % n == 0) {
      col.push(entry);
    }
  })
}

export default App;
