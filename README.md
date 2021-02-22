# ReactAquarium

ReactAquarium is an interface for solving Aquarium logic puzzles.

### How to Run

Requires [node.js](https://nodejs.org/en/).

Clone the project into a new directory, then in the project directory, run `npm install` and then `npm start`.

### Aquarium Puzzles

Aquarium puzzles consist of a square grid divided into regions. To solve the puzzle, mark squares as "filled" such that:

1. Each row and each column has a number of filled squares in it equal to the number in its heading.
2. If a square is filled, each other square in the same region that is in the same row or a lower row is also filled.

By default, clicking a square will toggle whether it's filled, represented by blue coloring.  By clicking "mark as empty" you can color squares pink to note that they can't possibly be filled. 

The solution-checking function only checks whether the correct squares are filled and ignores pink squares entirely.

### Puzzle Encoding

The program has an example puzzle preloaded.  Puzzles are represented by three variables:

* `size`: The puzzle's size (only square puzzles are supported).
* `containerArray`: An array of length `size * size`, which has one value for each cell (starting from top left and moving across each row top to bottom) based on which container it's in.  The actual numbers used don't matter, it's only important that container numbers are unique.
* `solutionArray`: An array of length `size * size`, which has either a 1 (filled) or a 0 (empty) for each cell depending on whether it is filled in the final solution.

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