import { useState, useRef, useEffect, useCallback } from "react";
import style from "./Timer.module.css";
import { BsGear, BsArrowRightCircleFill } from "react-icons/bs";
import SettingsModal from "./SettingModal";
import dingSound from "./sounds/zvonok.mp3";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useTranslation } from 'react-i18next';
import {patchResult} from "../../features/usersSlice"
import { removeTodo } from "../../features/todosSlice";


const padTime = (time: number) => {
  return time.toString().padStart(2, "0");
};

const Timer = () => {
  const [mainTime, setMainTime] = useState<number>(25 * 60);
  const [breakTime, setBreakTime] = useState<number>(5 * 60);
  const [initialMainTime, setInitialMainTime] = useState<number>(mainTime);
  const [initialBreakTime, setInitialBreakTime] = useState<number>(breakTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const audioRef = useRef(new Audio(dingSound));
  const { t } = useTranslation();

  const todos = useSelector((state: RootState) => state.todosReducer.todos);
const dispatch = useDispatch<AppDispatch>()
  const handleApplyBreakTime = () => {
    setIsSettingsOpen(true);
  };

  const resetTimer = useCallback(() => {

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
    const lastId = todos[todos.length -1]._id 
    toggleBreak();
    resetTimer();
    dispatch(patchResult())
    dispatch(removeTodo(lastId))
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

      setIsBreakTime(true);
      startTimer();
    } else if (breakTime === 0 && isBreakTime) {
      setIsBreakTime(false);
      startTimer();
    } else if (mainTime < 0 && !isBreakTime) {
      setIsBreakTime(true);
      setMainTime(initialMainTime);
    } else if (breakTime < 0 && isBreakTime) {

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

    setIsRunning(false);

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const toggleTime = () => {
    if (!isRunning) {
      setIsBreakTime((prevState) => !prevState);
      if (!isBreakTime) {
        setMainTime(initialBreakTime);
      } else {
        setMainTime(initialMainTime);
      }
    }
  };

  const minutes = padTime(
    Math.floor(isBreakTime ? breakTime / 60 : mainTime / 60)
  );
  const seconds = padTime(isBreakTime ? breakTime % 60 : mainTime % 60);

  const timerStyle = {
    backgroundColor: isBreakTime ? "#388f38" : "#a94442",
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

      <div className={style.timer}>
        <span className={style.font}>{minutes}</span>
        <span className={style.font}>:</span>
        <span className={style.font}>{seconds}</span>
      </div>
      <h6 className={style.text__timer}>
        {todos.length !== 0 ? todos[todos.length - 1].text : null}
      </h6>
      <div className={style.buttons}>
        {!isRunning && (
          <button className={style.button} onClick={startTimer}>
           <div>{t("start")}</div> 
          </button>
        )}
        {isRunning ? (
          <button className={style.button} onClick={stopTimer}>
            {t("stop")}
          </button>
        ) : (
          <button className={style.button} onClick={handleStop}>
            {isBreakTime ? <div>{t("skip")}</div> : <div>{t("stop")}</div> }
          </button>
        )}
        {isRunning && (
          <button className={style.button} onClick={handleSkip}>
            {t("made")}
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
