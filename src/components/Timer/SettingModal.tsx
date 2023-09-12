import React, { useState, useEffect } from "react";
import style from "./SettingModal.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

interface SettingsModalProps {
  mainTime: number;
  breakTime: number;
  setMainTime: (time: number) => void;
  setBreakTime: (time: number) => void;
  onClose: () => void;
  onUpdateInitialMainTime: (time: number) => void;
  onUpdateInitialBreakTime: (time: number) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  mainTime,
  breakTime,
  setMainTime,
  setBreakTime,
  onClose,
  onUpdateInitialMainTime,
  onUpdateInitialBreakTime,
}) => {
  const [newMainTime, setNewMainTime] = useState(mainTime / 60);
  const [newBreakTime, setNewBreakTime] = useState(breakTime / 60);

  useEffect(() => {
    onUpdateInitialMainTime(mainTime);
    onUpdateInitialBreakTime(breakTime);
  }, [mainTime, breakTime, onUpdateInitialMainTime, onUpdateInitialBreakTime]);

  const handleApplySettings = () => {
    const validatedMainTime = Math.max(newMainTime * 60, 60);
    const validatedBreakTime = Math.max(newBreakTime * 60, 60);

    setMainTime(validatedMainTime);
    setBreakTime(validatedBreakTime);

    onUpdateInitialMainTime(validatedMainTime); // Обновляем начальное время работы
    onUpdateInitialBreakTime(validatedBreakTime);
    onClose();
  };

  return (
    <div className={style.modal}>
      <button className={style.buttonClose} onClick={() => onClose()}>
        <AiFillCloseCircle />
      </button>
      <h2 className={style.h2}>Settings</h2>
      <div>
        <label className={style.label}>Main Time (minutes):</label>
        <input
          className={style.input}
          type="number"
          min="1"
          max="1440"
          value={Math.floor(newMainTime)}
          onChange={(e) => setNewMainTime(Number(e.target.value))}
        />
      </div>
      <div>
        <label className={style.label}>Break Time (minutes):</label>
        <input
          className={style.input}
          type="number"
          min="1"
          max="1440"
          value={Math.floor(newBreakTime)}
          onChange={(e) => setNewBreakTime(Number(e.target.value))}
        />
      </div>
      <button className={style.button} onClick={handleApplySettings}>
        Apply
      </button>
    </div>
  );
};

export default SettingsModal;
