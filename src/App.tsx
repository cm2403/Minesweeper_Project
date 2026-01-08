import "./App.css";
import Header from "./components/Header";
import Board from "./components/Board";
import SelectLevel from "./components/SelectLevel";
import useMinesweeperGame from "./hooks/useMinesweeperGame";
import ReactConfetti from "react-confetti";

function App() {
  const {
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
    restartGame,
  } = useMinesweeperGame();

  return (
    <div className="game">
      <Header
        isGameOver={isGameOver}
        isGameWin={isGameWin}
        isGameEnded={isGameEnded}
        minesLeft={minesLeft}
        timeDifference={timeDifference}
        startNewGame={startNewGame}
        restartGame={restartGame}
      />
      <Board
        level={level}
        gameBoard={gameBoard}
        handleCellLeftClick={handleCellLeftClick}
        handleCellRightClick={handleCellRightClick}
      />
      <SelectLevel level={level} changeLevel={changeLevel} />
      {isGameWin && <ReactConfetti />}
    </div>
  );
}

export default App;
