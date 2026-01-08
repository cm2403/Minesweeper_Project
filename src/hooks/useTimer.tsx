import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getTimeDiff } from "../utils/index.ts";

const useTimer = () => {
  const timerInterval = useRef<null | number>(null);
  const [timeStarted, setTimeStarted] = useState<Date | null>(null);
  const [timeNow, setTimeNow] = useState<Date | null>(null);
  const timeDifference = useMemo(
    () => getTimeDiff(timeNow, timeStarted),
    [timeNow]
  );
  const isTimerRunning = Boolean(timeStarted);

  const startTimer = useCallback(() => {
    setTimeStarted(new Date());
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(timerInterval.current!);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeStarted(null);
    setTimeNow(null);
  }, []);

  useEffect(() => {
    if (!timeStarted) return;

    timerInterval.current = setInterval(() => {
      setTimeNow(new Date());
    }, 1000);
  }, [timeStarted]);

  return {
    startTimer,
    stopTimer,
    resetTimer,
    timeDifference,
    isTimerRunning,
  };
};

export default useTimer;
