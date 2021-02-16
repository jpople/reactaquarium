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
      correct: false,
    };
  }
  render() {
    const rows = [];
    for (let i = 0; i < this.state.size; i++) {
      rows.push(this.renderRow(i));
    }
    return (
      <div className="puzzle-board">
        {this.renderColHeadings()}
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
        <div className="row-heading" key={n}>?
        </div>
        {cells}
      </div>
    );
  }

  renderColHeadings(){
    let headings = [];
    for(let i = 0; i < this.state.size; i ++) {
      let sum = 0;
      const col = getColumn(i, this.state.solution);
      console.log(col)
      for(let j = 0; j < col.length; j++) {
        sum += col[j];
      }
      headings.push(
        <div class="col-heading">{sum}</div>
      );
    }
    return (
      <div id="col-heading-holder">
        <div id="heading-frame-corner"></div>
        {headings}
      </div>
    )
  }

  renderCell(n) {
    // ideally I'd like to have this border logic elsewhere so it only has to be run once
    // other improvements to make:
    // centered on cell border rather than being all inside one cell
    // fix corners somehow?
    // am I going about this all wrong? should I be adding extra divs to be borders? can I draw divs partially overlapping other divs?
    const borderStyleString = "2px solid black";
    const coords = getCoords(n, this.state.containers);
    let borders = {};
    // checks to see if the cell needs a right border (i.e. is it in a different container than the cell immediately to its right)
    const right = this.state.containers[n] != this.state.containers[n + 1] && coords.col != (this.state.size - 1)
    if(right) {
      borders.borderRight = borderStyleString;
    }
    // same deal for columns
    const bottom = getColumn(coords.col, this.state.containers)[coords.row] !=  getColumn(coords.col, this.state.containers)[coords.row + 1] && coords.row != (this.state.size - 1);    
    if(bottom) {
      borders.borderBottom = borderStyleString;
    }
    if(this.state.squareValues[n]) {
      borders.backgroundColor = "lightskyblue"
    }
    return (
      <Cell 
      className="puzzle-square" 
      key={n} 
      style={borders}
      onClick={() => this.handleCellClick(n)}
      >
        {}
      </Cell>
    );
  }
  handleCellClick(n) {
    const cells = this.state.squareValues.slice();
    cells[n] = !cells[n];
    this.setState({squareValues: cells});
  }
}

class Cell extends React.Component {
  render(){
    return(
      <div className="puzzle-square" style={this.props.style} onClick={() => this.props.onClick()}>

      </div>
    )
  }
}

function getRow(n, array) {
  // gets the nth row of a provided (square) array
  const size = Math.sqrt(array.length);
  return array.slice((size * n), (size * (n + 1)));
}

function getColumn(n, array) {
  // gets the nth column of a provided (square) array
  let size = Math.sqrt(array.length);
  let col = [];
  for (let i = 0; i < array.length; i++){
    if (i % size == n % size) {
      col.push(array[i]);
    }
  }
  return col;
}

function getCoords(n, array) {
  // gets the coordinates (row, column) of the nth square on a board
  const size = Math.sqrt(array.length);
  return {
    row: Math.floor(n / size),
    col: (n % size)
  }
}

export default App;
