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

export const initBoard = (rows: number, cols: number, totalMines: number) => {
  const emptyBoard = createBoard(rows, cols);
  const boardWithMines = fillBoardWithMines(emptyBoard, rows, cols, totalMines);

  return boardWithMines;
};

export const initGame = (rows: number, cols: number, totalMines: number) => {
  return initBoard(rows, cols, totalMines);
};
