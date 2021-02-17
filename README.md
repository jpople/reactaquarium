# ReactAquarium

ReactAquarium is an interface for solving Aquarium logic puzzles.

### How to Run

Requires [node.js](https://nodejs.org/en/).

Clone the project into a new directory, then in the project directory, run `npm install` and then `npm start`.

### Aquarium Puzzles

Aquarium puzzles consist of a square grid divided into regions. To solve the puzzle, mark squares as "filled" such that:

1. Each row and each column has a number of filled squares in it equal to the number in its heading.
2. If a square is filled, each other square in the same region that is in the same row or a lower row is also filled.

By default, clicking a square will toggle whether it's filled, represented by blue coloring.  By clicking "mark as empty" you can color squares pink to note that they can't be filled. 

The solution-checking function only checks whether the correct squares are filled and doesn't care whether empty squares are pink.

### Planned Improvements

2021-02-17:

* Functionality:
    * Create API from which the app can get more puzzles, and eventually have features like choosing size or difficulty
    * Add ability undo/redo/reset
    * Get rid of filled/empty toggle button and add a better way to mark empty squares, likely right-click or shift-click or similar
    * Add additional options to:
        * Mark completed rows/columns
        * Display errors in real time
        * Autofill containers on marking one square

* Style:
    * Make it look less bad