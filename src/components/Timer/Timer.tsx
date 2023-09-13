import { useState, useRef, useEffect, useCallback } from "react";
import style from "./Timer.module.css";
import { BsGear, BsArrowRightCircleFill } from "react-icons/bs";
import SettingsModal from "./SettingModal";
import dingSound from "./sounds/zvonok.mp3";

const padTime = (time: number) => {
  return time.toString().padStart(2, "0");
};

const Timer = () => {
  const [mainTime, setMainTime] = useState<number>(25 * 60);
  const [breakTime, setBreakTime] = useState<number>(5 * 60);
  const [initialMainTime, setInitialMainTime] = useState<number>(mainTime);
  const [initialBreakTime, setInitialBreakTime] = useState<number>(breakTime);
  const [title, setTitle] = useState<string>("Let the countdown begin!");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const audioRef = useRef(new Audio(dingSound));

  const handleApplyBreakTime = () => {
    setIsSettingsOpen(true);
  };

  const resetTimer = useCallback(() => {
    setTitle("Ready for another round!");
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
    intervalRef.current = null;

    if (!isBreakTime) {
      setMainTime(initialMainTime);
    } else {
      setBreakTime(initialBreakTime);
    }
    audioRef.current.play();
  }, [initialMainTime, initialBreakTime, isBreakTime]);

  const toggleBreak = () => {
    setIsBreakTime(!isBreakTime);
  };

  const handleSkip = () => {
    toggleBreak();
    resetTimer();
  };

  const handleStop = () => {
    if (isBreakTime) {
      // Если текст кнопки "Пропустить", то переходите к рабочему времени
      setIsBreakTime(false);
      resetTimer();
    } else {
      // Если текст кнопки "Stop", то просто сбрасываем таймер
      resetTimer();
    }
  };

  useEffect(() => {
    if (mainTime === 0 && !isBreakTime) {
      setTitle("Break");
      setIsBreakTime(true);
      startTimer();
    } else if (breakTime === 0 && isBreakTime) {
      setTitle("Let the countdown begin!");
      setIsBreakTime(false);
      startTimer();
    } else if (mainTime < 0 && !isBreakTime) {
      setTitle("Break");
      setIsBreakTime(true);
      setMainTime(initialMainTime);
    } else if (breakTime < 0 && isBreakTime) {
      setTitle("Let the countdown begin!");
      setIsBreakTime(false);
      setBreakTime(initialBreakTime);
    }
  }, [mainTime, breakTime, isBreakTime, initialMainTime, initialBreakTime]);

  const startTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    setIsRunning(true);
    

    intervalRef.current = setInterval(() => {
      if (isBreakTime && breakTime > 0) {
        setBreakTime((prevBreakTime) => prevBreakTime - 1);
      } else if (!isBreakTime && mainTime > 0) {
        setMainTime((prevMainTime) => prevMainTime - 1);
      } else {
        resetTimer();
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current === null) return;

    setTitle("Keep it going!");
    setIsRunning(false);

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const toggleTime = () => {
    if (!isRunning) {
      setIsBreakTime((prevState) => !prevState);
      if (!isBreakTime) {
        setMainTime(initialBreakTime);
        setTitle("Break Time");
      } else {
        setMainTime(initialMainTime);
        setTitle("Work Time");
      }
    }
  };

  const minutes = padTime(
    Math.floor(isBreakTime ? breakTime / 60 : mainTime / 60)
  );
  const seconds = padTime(isBreakTime ? breakTime % 60 : mainTime % 60);

  const timerStyle = {
    backgroundColor: isBreakTime ? "green" : "#be3939",
  };

  return (
    <div className={style.app} style={timerStyle}>
      <div className={style.iconsTop}>
        <div className={style.settingsIcon} onClick={handleApplyBreakTime}>
          <BsGear />
        </div>
        <button className={style.buttonArrow} onClick={toggleTime}>
          <BsArrowRightCircleFill />
        </button>
      </div>

      <h1 className={style.title}>{title}</h1>

      <div className={style.timer}>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className={style.buttons}>
        {!isRunning && (
          <button className={style.button} onClick={startTimer}>
            Start
          </button>
        )}
        {isRunning && !isBreakTime ? (
          <button className={style.button} onClick={stopTimer}>
            Pause
          </button>
        ) : (
          <button className={style.button} onClick={handleStop}>
            {isBreakTime ? "Пропустить" : "Stop"}
          </button>
        )}
        {isRunning && (
          <button className={style.button} onClick={handleSkip}>
            Сделано
          </button>
        )}
      </div>

      {isSettingsOpen && (
        <SettingsModal
          mainTime={mainTime}
          breakTime={breakTime}
          setMainTime={setMainTime}
          setBreakTime={setBreakTime}
          onClose={() => setIsSettingsOpen(false)}
          onUpdateInitialMainTime={setInitialMainTime}
          onUpdateInitialBreakTime={setInitialBreakTime}
        />
      )}
    </div>
  );
};

export default Timer;
