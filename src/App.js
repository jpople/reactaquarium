import './App.css';
import React from 'react';
import { render } from '@testing-library/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Puzzle 
        containerArray={[1, 1, 1, 2, 3, 3, 4, 1, 5, 2, 2, 6, 4, 5, 5, 7, 2, 6, 5, 5, 7, 7, 8, 8, 7, 7, 7, 8, 8, 8, 9, 9, 7, 7, 7, 7]}
        solutionArray={[1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0]}
        size={6}
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
      emptyMarks: Array(this.props.solutionArray.length).fill(false),
      correct: null,
      fillMode: true,
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
        {this.renderButtonPanel()}
        {this.renderCompletionMessage()}
      </div>
    )
  }
  renderRow(n) {
    const cells = [];
    for (let i = (this.state.size * n); i < (this.state.size * (n + 1)); i++) {
      cells.push(this.renderCell(i));
    }
    let heading = 0;
    getRow(n, this.state.solution).forEach(cell => {
      heading += cell;
    });
    return (
      <div className="puzzle-row" key={n}>
        <div className="row-heading" key={n}>
          {heading}
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
      for(let j = 0; j < col.length; j++) {
        sum += col[j];
      }
      headings.push(
        <div className="col-heading" key={i}>{sum}</div>
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
    if(this.state.emptyMarks[n]){
      borders.backgroundColor = "pink"
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

  renderButtonPanel() {
    return(
      <div>
        <button
          onClick={() => {this.checkCompletion()}}
        >
          Check solution
        </button>
        <button onClick={() => {this.setState({fillMode: !this.state.fillMode})}}>
        {this.state.fillMode ? "Mark as empty" : "Mark as full"}
      </button>
      </div>
    )
  }

  renderCompletionMessage(){
    if(this.state.correct != null) {
      return <span>{this.state.correct ? "Solution is correct!" : "Errors are present."}</span>
    }
  }

  handleCellClick(n) {
    if(this.state.fillMode) {
      const cells = this.state.squareValues.slice();
      cells[n] = !cells[n];
      this.setState({squareValues: cells}); 
    }
    else {
      if (!this.state.squareValues[n]) {
        const empties = this.state.emptyMarks.slice();
        empties[n] = !empties[n];
        this.setState({emptyMarks: empties});
      }
    }
  }

  checkCompletion() {
    let attempt = [];
    let isAttemptCorrect = true;
    this.state.squareValues.forEach(cell => {
      if(cell) {
        attempt.push(1);
      }
      else {
        attempt.push(0);
      }
    });
    for(let i = 0; i < attempt.length; i++) {
      if(attempt[i] != this.state.solution[i]){
        isAttemptCorrect = false;
      }
    }
    this.setState({correct: isAttemptCorrect});
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
