# ReactAquarium

ReactAquarium is an interface for solving Aquarium logic puzzles.

### How to Run

Requires [node.js](https://nodejs.org/en/).

Clone the project into a new directory, then in the project directory, run `npm install` and then `npm start`.

### Aquarium Puzzles

Aquarium puzzles consist of a square grid divided into regions ("containers"). To solve the puzzle, mark squares as "filled" such that:

1. Each row and each column has a number of filled squares in it equal to the number in its heading.
2. If a square is filled, each other square in the same region that is in the same row or a lower row is also filled.

### Interface

By default, left-clicking a square will toggle whether it's filled, represented by blue coloring.  Right-clicking allows you to color squares pink to note that they're definitely empty.  Pink squares are purely for cosmetic/memory aid purposes, the solution-checking function only checks whether the correct squares are blue.

While fill mode is on, left-clicking a cell will fill all cells in the same container in the same row or below instead of changing only the clicked cell. Right-clicking does the same but filling pink upwards instead. If doing so would change a square from blue directly to pink or pink directly to blue, it has no effect instead.

While header hints are on, row and column headings will change colors to indicate their status; white (default), gray (the correct number of squares are filled), or red (too many squares are filled).  Note that this functionality only checks the number of filled squares and not the position.

### Puzzle Encoding

The program has an example puzzle preloaded.  Puzzles are represented by three variables:

* `size`: The puzzle's size (only square puzzles are supported).
* `containerArray`: An array of length `size * size`, which has an integer value for each cell based on which container it's in. Container numbers must be unique.
* `solutionArray`: An array of length `size * size`, which has either a 1 (filled) or a 0 (empty) for each cell depending on whether it is filled in the final solution.

Both `containerArray` and `solutionArray` begin in the top-left corner and go across rows left-to-right down to the bottom.

### Planned Improvements

Updated 2021-04-04:

* Functionality:
    * Create API from which the app can get more puzzles, and eventually have features like choosing size or difficulty
    * Add ability to undo/redo

* Code:
    * Better organize code into classes/multiple files
    * Formatting fixes

* Style:
    * Make it look less bad, including but not limited to:
        * Add a real options menu
        * Include a nice in-page tutorial/rules explanation somewhere