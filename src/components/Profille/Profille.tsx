import React from "react";
import { useState, useEffect } from "react";
import style from "./Profille.module.css";
import { AiOutlineMenu } from 'react-icons/ai';
import { BsCheckCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {oneUser} from "../../features/usersSlice"
import stringHash from "string-hash";


const Profille = () => {

const userOn = useSelector((state:RootState)=> state.usersSlice.oneUser)
const todos = useSelector((state:RootState)=> state.todosReducer.todos)
const dispatch = useDispatch<AppDispatch>()

useEffect(()=> {
  dispatch(oneUser())
}, [])

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
            <h2 className={style.name}>{userOn.login}</h2>
            <div className={style.hr2}></div>
          </div>

          <div className={style.timer_block}>
            <div style={{backgroundColor: `#${(stringHash(userOn.login || "") % 0xfffffa ).toString(15)}`,}} className={style.name_block}>{userOn.login[0]}</div>
            <div className={style.second_timer}>
              <span className={style.timer}>{timer}</span>
              <p className={style.time}>Помидор остановлен: {time}</p>
            </div>
          </div>
          <div className={style.tasks}>
            <div className={style.block1}>
                <div className={style.quantity}>
                    <span style={{display: 'flex'}}><AiOutlineMenu/></span>
                    <span>{todos.length}</span>
                </div>
                <div className={style.plan}>
                    <span>Запланировано</span>
                </div>
            </div>
            <div className={style.block2}>
                <div className={style.quantity2}>
                    <span style={{display: 'flex'}}><BsCheckCircleFill/></span>
                    <span>{userOn.result}</span>
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
