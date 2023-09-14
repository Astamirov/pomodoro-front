import React from "react";
import { useState } from "react";
import style from "./Profille.module.css";
import { AiOutlineMenu } from 'react-icons/ai';
import { BsCheckCircleFill } from "react-icons/bs";


const Profille = () => {
  const timers = "00:00";
  const times = "01:05РМ";
  const [timer, setTimer] = useState(timers);
  const [time, setTime] = useState(times);
  return (
    <div className={style.profille}>
      <div className={style.profille_container}>
        <div className={style.profille_content}>
          <div className={style.name_profille}>
            <div className={style.hr1}></div>
            <h2 className={style.name}>RAMZAN TIMIRKIEV</h2>
            <div className={style.hr2}></div>
          </div>

          <div className={style.timer_block}>
            <div className={style.name_block}>R</div>
            <div className={style.second_timer}>
              <span className={style.timer}>{timer}</span>
              <p className={style.time}>Помидор остановлен: {time}</p>
            </div>
          </div>
          <div className={style.tasks}>
            <div className={style.block1}>
                <div className={style.quantity}>
                    <span style={{display: 'flex'}}><AiOutlineMenu/></span>
                    <span>1</span>
                </div>
                <div className={style.plan}>
                    <span>Запланировано</span>
                </div>
            </div>
            <div className={style.block2}>
                <div className={style.quantity2}>
                    <span style={{display: 'flex'}}><BsCheckCircleFill/></span>
                    <span>1</span>
                </div>
                <div className={style.plan2}>
                    <span>Сделано</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profille;
