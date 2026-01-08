import { DIRECTIONS } from "../constants";
import type { GameCell, TBoard } from "../types";

//Function create an empty board by filling it with empty cells
const createBoard = (rows: number, cols: number) => {
  const board: TBoard = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    board[rowIndex] = [];

    for (let cellIndex = 0; cellIndex < cols; cellIndex++) {
      board[rowIndex][cellIndex] = {
        value: null,
        isOpened: false,
        isFlagged: false,
      };
    }
  }

  return board;
};

const fillBoardWithMines = (
  emptyBoard: TBoard,
  rows: number,
  cols: number,
  totalMines: number
) => {
  let mines = 0;
  while (mines < totalMines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (emptyBoard[row][col].value !== "mine") {
      (emptyBoard[row][col] as GameCell).value = "mine";
      mines++;
    }
  }

  return emptyBoard;
};

const fillBoardWithNumbers = (boardWithMines: TBoard) => {
  boardWithMines.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell.value !== "mine") {
        let minesAround = 0;

        DIRECTIONS.forEach(([dRow, dCol]) => {
          const newRow = rowIndex + dRow;
          const newCol = cellIndex + dCol;
          if (newRow in boardWithMines && newCol in boardWithMines[newRow]) {
            if (boardWithMines[newRow][newCol].value === "mine") {
              minesAround++;
            }
          }
        });

        cell.value = minesAround;
      }
    });
  });

  return boardWithMines;
};

export const initBoard = (rows: number, cols: number, totalMines: number) => {
  const emptyBoard = createBoard(rows, cols);
  const boardWithMines = fillBoardWithMines(emptyBoard, rows, cols, totalMines);
  const gameBoard = fillBoardWithNumbers(boardWithMines);

  return gameBoard;
};

export const initGame = (rows: number, cols: number, totalMines: number) => {
  return initBoard(rows, cols, totalMines);
};

export const revealEmptyCells = (
  board: TBoard,
  rows: number,
  cols: number,
  row: number,
  col: number
) => {
  const queue: [number, number][] = [[row, col]];
  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift()!;
    const cell = board[currentRow][currentCol];
    cell.isOpened = true;

    if (cell.value === 0) {
      DIRECTIONS.forEach(([dRow, dCol]) => {
        const newRow = currentRow + dRow;
        const newCol = currentCol + dCol;

        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          !board[newRow][newCol].isOpened &&
          !board[newRow][newCol].isFlagged
        ) {
          queue.push([newRow, newCol]);
        }
      });
    }
  }
  return board;
};

export const revealAllMines = (board: TBoard, highlightWin?: boolean) => {
  board.forEach((row) => {
    row.forEach((cell) => {
      if (cell.value === "mine") {
        cell.isOpened = true;
        if (highlightWin) {
          cell.highlight = "green";
        } else {
          cell.highlight = "red";
        }
      }
    });
  });
  return board;
};

export const checkGameWin = (board: TBoard, totalMines: number) => {
  let unopenedCells = 0;
  let correctlyFlaggedMines = 0;

  board.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.isOpened) {
        unopenedCells++;
      }

      if (cell.value === "mine" && cell.isFlagged) {
        correctlyFlaggedMines++;
      }
    });
  });

  console.log({ unopenedCells, correctlyFlaggedMines, totalMines });

  return unopenedCells === totalMines || correctlyFlaggedMines === totalMines;
};

export const getTimeDiff = (timeNow: Date | null, timeStarted: Date | null) => {
  if (timeNow === null || timeStarted === null) return "00:00";

  return new Intl.DateTimeFormat("en-US", {
    minute: "2-digit",
    second: "2-digit",
  }).format(timeNow.getTime() - timeStarted.getTime());
};
