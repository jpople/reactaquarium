import './App.css';
import React from 'react';
import { render } from '@testing-library/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PuzzleBoard />
      </header>
    </div>
  );
}

function Square() {
  return ( 
    <div>
    </div>
  );
}

function PuzzleBoard() {
  const grid = new Puzzle(3, [1, 1, 1, 2, 2, 1, 2, 2, 2], [0, 0, 0, 0, 0, 1, 1, 1, 1]);
  const rightBorder = {borderRight : "solid #282c34 4px", };
  return (
    <div>
      <div id="col-heading-holder">
        <div className="heading"></div>
        {grid.colHeadings.map((heading, index) => {
          return <div key={index} className="heading">{heading}</div>
        })}
      </div>
      {grid.rowHeadings.map((heading, index) => {
        return (
          <div className="row-holder">
            <div key={index} className="heading">{heading}</div>
            {getBorders(grid.containerRows)[index].map((cell) => {
              if (cell == 1) {
                return <div className="puzzle-square" style={rightBorder}>{cell}</div>
              }
              else {
                return <div className="puzzle-square">{cell}</div>
              }
            })}
            
          </div>
        );
      })}
    </div>
  );
}

class Puzzle {
  constructor(size, containerArray, solutionArray) {
    this.size = size;
    this.containerArray = containerArray;
    this.containerRows = constructRows(size, containerArray);
    this.containerCols = constructCols(size, containerArray);
    this.solutionArray = solutionArray;
    this.solutionRows = constructRows(size, solutionArray);
    this.solutionCols = constructCols(size, solutionArray);
    this.rowHeadings = getHeadings(this.solutionRows);
    this.colHeadings = getHeadings(this.solutionCols);
    
  }
}

function constructRows(size, array) { // gotta be something nicer here, Jesus
  let rows = Array(size).fill([]);
  for (let i = 0; i < size; i++) {
    rows[i] = array.splice(0, size);
    rows[i].forEach(cell => {
      array.push(cell);
    });
  }
  return rows;
}

function constructCols(size, array) {
  let cols = [];
  for (let i = 0; i < size; i++) {
    cols.push([]);
  }
  for (let i = 0; i < array.length; i++) {
    cols[(i % 3)].push(array[i]);
  }
  return cols;
}

function getHeadings(rowArray) { // accepts an array of row or column vectors from a solution, generates an array of the corresponding column headings
  // map would be good here probably? should learn how to use that
  let headings = [];
  rowArray.forEach(row => {
    let sum = 0;
    row.forEach(entry => {
      sum += entry;
    });
    headings.push(sum);
  });
  return headings;
}

function getBorders(rowArray) { 
  // accepts an array of row or column vectors with container IDs, generates an array with 1s in cells which should have a border "after" them
  // "after" here means to the right for rows or below for columns, works on either
  let borders = [];
  rowArray.forEach(row => {
    for (let i = 0; i < row.length; i++){
      console.log("comparing " + row[i] + " and " + row[i+1]);
      if (row[i] == row[i+1]) {
        console.log("pushing 0")
        borders.push(0);
      }
      else {
        console.log("pushing 1")
        borders.push(1);
      }
    }
  })
  console.log(borders);
  borders = constructRows(rowArray.length, borders);
  console.log(borders);
  return borders;
}


export default App;
