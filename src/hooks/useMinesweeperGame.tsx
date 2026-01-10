import { useEffect, useCallback, useState } from "react";
import {
  initGame,
  revealEmptyCells,
  revealAllMines,
  checkGameWin,
} from "../utils";
import type { TBoard, TLevel } from "../types";
import { LEVELS, DEFAULT_LEVEL } from "../constants";
import type { MouseEvent } from "react";
import useTimer from "./useTimer";

const useMinesweeperGame = () => {
  // Level Changing
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const currentLevel = LEVELS[level];

  const changeLevel = useCallback((selectedLevel: TLevel) => {
    setLevel(selectedLevel);
  }, []);

  const [gameBoard, setGameBoard] = useState(
    initGame(currentLevel.rows, currentLevel.cols, currentLevel.totalMines)
  );

  const resetBoard = useCallback(() => {
    stopTimer();
    resetTimer();
    setTotalFlags(0);
    setIsGameOver(false);
    setIsGameWin(false);

    setGameBoard(
      initGame(currentLevel.rows, currentLevel.cols, currentLevel.totalMines)
    );
  }, [currentLevel]);

  const startNewGame = useCallback(() => {
    resetBoard();
  }, [resetBoard]);

  useEffect(() => {
    startNewGame();
  }, [level]);

  // Game state
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWin, setIsGameWin] = useState(false);
  const isGameEnded = isGameOver || isGameWin;

  //Timer functionality
  const { startTimer, stopTimer, resetTimer, timeDifference, isTimerRunning } =
    useTimer();

  useEffect(() => {
    if (isGameEnded) {
      stopTimer();
    }
  }, [isGameEnded, stopTimer]);

  // Cell Interactions
  const [totalFlags, setTotalFlags] = useState(0);
  const minesLeft = currentLevel.totalMines - totalFlags;

  const openCell = (board: TBoard, row: number, col: number) => {
    if (!isTimerRunning) startTimer();

    const newGameBoard = JSON.parse(JSON.stringify(board));
    const cell = newGameBoard[row][col];
    const isMineCell = cell.value === "mine";
    const isNumberCell = typeof cell.value === "number" && cell.value > 0;
    const isEmptyCell = typeof cell.value === "number" && cell.value === 0;

    if (isMineCell) {
      setIsGameOver(true);
      revealAllMines(newGameBoard);
    }

    if (!isMineCell) {
      cell.isOpened = true;
      if (isNumberCell) {
        console.log(cell.value);
      }

      if (isEmptyCell) {
        revealEmptyCells(
          newGameBoard,
          currentLevel.rows,
          currentLevel.cols,
          row,
          col
        );
      }

      if (checkGameWin(newGameBoard, currentLevel.totalMines)) {
        setIsGameWin(true);
        revealAllMines(newGameBoard, true);
      }
    }
    return newGameBoard;
  };

  const handleCellLeftClick = (row: number, col: number) => {
    if (
      isGameEnded ||
      gameBoard[row][col].isOpened ||
      gameBoard[row][col].isFlagged
    ) {
      return;
    }

    const isEmptyCell = gameBoard[row][col].value === 0;
    const isFirstClick = !isTimerRunning;
    const isFirstClickOnNotEmptyCell = isFirstClick && !isEmptyCell;

    let newGameBoard: TBoard;

    if (isFirstClickOnNotEmptyCell) {
      do {
        newGameBoard = initGame(
          currentLevel.rows,
          currentLevel.cols,
          currentLevel.totalMines
        );
      } while (newGameBoard[row][col].value !== 0);
    } else {
      newGameBoard = JSON.parse(JSON.stringify(gameBoard));
    }

    const boardAfterOpeningCell = openCell(newGameBoard, row, col);

    if (boardAfterOpeningCell) {
      setGameBoard(boardAfterOpeningCell);
    }
  };

  const handleCellRightClick = (
    e: MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => {
    e.preventDefault();

    if (isGameEnded || gameBoard[row][col].isOpened) {
      return;
    }

    if (!isTimerRunning) startTimer();

    let flagsDiff = 0;

    setGameBoard((prevGameBoard) => {
      const newGameBoard: TBoard = JSON.parse(JSON.stringify(prevGameBoard));
      const cell = prevGameBoard[row][col];
      if (cell.isFlagged) {
        newGameBoard[row][col].isFlagged = false;
        if (!flagsDiff) flagsDiff--;
      } else {
        newGameBoard[row][col].isFlagged = true;
        if (!flagsDiff) flagsDiff++;
      }
      return newGameBoard;
    });

    setTotalFlags((prevTotalFlags) => {
      return prevTotalFlags + flagsDiff;
    });
  };

  return {
    level,
    changeLevel,
    gameBoard,
    handleCellLeftClick,
    handleCellRightClick,
    isGameOver,
    isGameWin,
    isGameEnded,
    minesLeft,
    timeDifference,
    startNewGame,
  };
};

export default useMinesweeperGame;
