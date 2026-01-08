import type { TLevel } from "../types";

export const CELL_NUMBERS_COLORS = [
  null,
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
];

export const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const LEVELS = {
  easy: { rows: 13, cols: 9, totalMines: 15 },
  medium: { rows: 17, cols: 15, totalMines: 50 },
  hard: { rows: 21, cols: 23, totalMines: 100 },
};

export const DEFAULT_LEVEL: TLevel = "easy";
