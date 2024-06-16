const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const columns = 50;
const rows = 50;

function createGrid() {
  return new Array(columns)
    .fill(0)
    .map(() =>
      new Array(rows).fill(0).map(() => Math.floor(Math.random() * 2))
    );
}

let grid = createGrid();

function nextGen(grid) {
  const nextGen = grid.map((arr) => [...arr]);

  for (let col = 0; col < columns; col++) {
    for (let row = 0; row < rows; row++) {
      const cell = grid[col][row];
      let numNeighbours = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          if (i === 0 && j === 0) {
            continue;
          }
          const neighbourCol = col + i;
          const neighbourRow = row + j;

          if (
            neighbourCol >= 0 &&
            neighbourRow >= 0 &&
            neighbourCol < columns &&
            neighbourRow < rows
          ) {
            const currentNeighbour = grid[col + i][row + j];
            numNeighbours += currentNeighbour;
          }
        }
      }

      if (cell === 1 && numNeighbours < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbours > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbours === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
}

const cellWidth = canvas.width / columns;
const cellHeight = canvas.height / rows;

function drawGrid(grid) {
  grid.forEach((col, colIndex) => {
    col.forEach((cell, rowIndex) => {
      ctx.beginPath();
      ctx.rect(
        colIndex * cellWidth,
        rowIndex * cellHeight,
        cellWidth,
        cellHeight
      );
      ctx.fillStyle = cell ? "red" : "white";
      ctx.fill();
    });
  });
}

function update() {
  grid = nextGen(grid);
  drawGrid(grid);
}

setInterval(update, 200);
