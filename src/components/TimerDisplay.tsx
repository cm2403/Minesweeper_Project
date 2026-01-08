import TimerIcon from "/icons/timer.png";

type Props = {
  timeDifference: string;
};

const TimerDisplay = (props: Props) => {
  const { timeDifference } = props;

  return (
    <>
      <img src={TimerIcon} className="header-icon" />
      {timeDifference}
    </>
  );
};

export default TimerDisplay;
