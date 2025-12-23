import Cell from "./Cell";
import { TBoard } from "../types";

const BOARD: TBoard = [
  [{ value: 0 }, { value: 1 }, { value: 2 }, { value: "mine" }],
  [
    { value: 3 },
    { value: 4, isOpened: false, isFlagged: false },
    { value: 5 },
    { value: 6 },
  ],
  [{ value: 7 }, { value: 8 }, { value: "mine" }, { value: "mine" }],
];

const Board = () => {
  return (
    <div className="board">
      {BOARD.map((row) => (
        <div className="row">
          {row.map((cell) => (
            <Cell cell={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
