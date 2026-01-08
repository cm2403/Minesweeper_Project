import clsx from "clsx";
import { CELL_NUMBERS_COLORS } from "../constants";
import mineIcon from "/icons/bomb.png";
import flagIcon from "/icons/flag.png";
import type { GameCell, TLevel } from "../types";
import type { MouseEvent } from "react";

type Props = {
  cell: GameCell;
  rowIndex: number;
  cellIndex: number;
  handleCellLeftClick: (row: number, col: number) => void;
  handleCellRightClick: (
    e: MouseEvent<HTMLDivElement>,
    row: number,
    col: number
  ) => void;
  level: TLevel;
};

const Cell = ({
  cell,
  rowIndex,
  cellIndex,
  handleCellLeftClick,
  handleCellRightClick,
  level,
}: Props) => {
  return (
    <div
      className={clsx(
        "cell",
        typeof cell.value === "number" && CELL_NUMBERS_COLORS[cell.value],
        cell.value === "mine" && cell.highlight,
        level !== "easy" && "small"
      )}
      onClick={() => handleCellLeftClick(rowIndex, cellIndex)}
      onContextMenu={(e) => handleCellRightClick(e, rowIndex, cellIndex)}
    >
      {typeof cell.value === "number" && <>{cell.value || ""}</>}
      {cell.value === "mine" && <img src={mineIcon} alt="Mine" />}
      {!cell.isOpened && (
        <div className="overlay">
          <img
            src={flagIcon}
            className={clsx("flag", cell.isFlagged && "visible")}
            alt="Flag"
          />
        </div>
      )}
    </div>
  );
};

export default Cell;
