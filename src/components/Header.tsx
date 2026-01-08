import GameStatus from "./GameStatus";
import TimerDisplay from "./TimerDisplay";

type Props = {
  isGameWin: boolean;
  isGameOver: boolean;
  isGameEnded: boolean;
  minesLeft: number;
  timeDifference: string;
  startNewGame: () => void;
  restartGame: () => void;
};

const Header = (props: Props) => {
  const {
    isGameWin,
    isGameOver,
    isGameEnded,
    minesLeft,
    timeDifference,
    startNewGame,
    restartGame,
  } = props;
  return (
    <header>
      <div className="header-label">
        <GameStatus
          isGameWin={isGameWin}
          isGameOver={isGameOver}
          isGameEnded={isGameEnded}
          minesLeft={minesLeft}
        />
      </div>
      <div className="header-buttons">
        <button onClick={startNewGame}>New</button>
        <button onClick={restartGame}>Restart</button>
      </div>
      <div className="header-label">
        <TimerDisplay timeDifference={timeDifference} />
      </div>
    </header>
  );
};

export default Header;
