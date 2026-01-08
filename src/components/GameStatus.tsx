import BombIcon from "/icons/bomb.png";

type Props = {
  isGameWin: boolean;
  isGameOver: boolean;
  isGameEnded: boolean;
  minesLeft: number;
};

const GameStatus = (props: Props) => {
  const { isGameWin, isGameOver, isGameEnded, minesLeft } = props;

  return (
    <>
      {isGameWin && <span>You Win!</span>}
      {isGameOver && <span>Game Over!</span>}
      {!isGameEnded && (
        <>
          <img src={BombIcon} className="header-icon" />
          {minesLeft}
        </>
      )}
    </>
  );
};

export default GameStatus;
