import Cell from "./Cell";
import type { TBoard, TLevel } from "../types";
import type { MouseEvent } from "react";

type Props = {
  level: TLevel;
  gameBoard: TBoard;
  handleCellLeftClick: (row: number, col: number) => void;
  handleCellRightClick: (
    e: MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => void;
};

const Board = (props: Props) => {
  const { level, gameBoard, handleCellLeftClick, handleCellRightClick } = props;
  return (
    <div className="board">
      {gameBoard.map((row, rowIndex) => (
        <div className="row">
          {row.map((cell, cellIndex) => (
            <Cell
              cell={cell}
              rowIndex={rowIndex}
              cellIndex={cellIndex}
              handleCellLeftClick={handleCellLeftClick}
              handleCellRightClick={handleCellRightClick}
              level={level}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
