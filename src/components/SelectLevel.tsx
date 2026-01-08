import type { TLevel } from "../types";
import { LEVELS } from "../constants";
import clsx from "clsx";

type Props = {
  level: string;
  changeLevel: (selectedLevelName: TLevel) => void;
};

const SelectLevel = ({ level, changeLevel }: Props) => {
  return (
    <ul className="select-level">
      {Object.keys(LEVELS).map((levelName) => (
        <li key={levelName}>
          <button
            className={clsx(level === levelName && "active")}
            onClick={() => changeLevel(levelName as TLevel)}
          >
            {levelName}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SelectLevel;
