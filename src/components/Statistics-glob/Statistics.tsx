
import { FiUser} from "react-icons/fi";
import React, { useEffect } from "react";

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import style from "./Statistics.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchUsers } from "../../features/usersSlice";

const Statistics = () => {
  const user = useSelector((state: RootState) => state.usersSlice.users)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const sortedUsers = user.slice().sort((a, b) => b.result - a.result);

  
  return (
    <div>
      <div className={style.statistics_container}>
        <div className={style.header_satatistics}>
        
         
          <div className={style.global_statistics}>
            <div className={style.day_hour}>
              <button
                className={style.today}
            
              >
                Сегодня
              </button>
              <div
                style={{
                  height: "30px",
                  width: "1px",
                  backgroundColor: "white",
                }}
              ></div>
              <button
                className={style.day}
                
              >
                Неделя
              </button>
              <div
                style={{
                  height: "30px",
                  width: "1px",
                  backgroundColor: "white",
                }}
              ></div>
              <button
                className={style.month}
              >
                Месяц
              </button>
            </div>
            <div className={style.navigation_arrow}>
              <p style={{ padding: "5px" }} className={style.btn_left}>
                <AiOutlineArrowLeft />
              </p>
              <div
                style={{
                  height: "30px",
                  width: "1px",
                  backgroundColor: "white",
                }}
              ></div>
              <p style={{ padding: "5px" }}>Страница 1/1</p>
              <div
                style={{
                  height: "30px",
                  width: "1px",
                  backgroundColor: "white",
                }}
              ></div>
              <p style={{ padding: "5px" }} className={style.btn_right}>
                <AiOutlineArrowRight />
              </p>
            </div>
          </div>
          <div className={style.users_stat}>
            <div className={style.timer}>
              <h5 className={style.user_h5}>ПОЛЬЗОВАТЕЛЬ</h5>
              <div className={style.timer_user}>
                <h5>ВРЕМЯ(HH:MM)</h5>
                <h5 className={style.pomidor_user}>ПОМИДОРЫ</h5>
              </div>
            </div>
          </div>
          <div className={style.block_container}>
            
                {sortedUsers.map((item, index)=> {
                  return (<div key={item._id} className={style.block}>
              <div className={style.block_users}>
                <h1 className={style.index_user}>{index + 1}</h1>
                <h3 className={style.user_sait}><FiUser/></h3>
                <div>
                  <h3>{item.login}</h3>
                  <p>03/01/2022</p>
                </div>
              </div>
              <div className={style.block_timer}>
                <h3 className={style.time}>06:56</h3>
                <h3 className={style.pomidor}>{item.result}</h3>
              </div>
            </div>
                )
                })}
                
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
