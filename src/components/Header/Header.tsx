import { NavLink, Link } from "react-router-dom";
import style from "./Header.module.css";
import { useState } from "react";
import { BsCheckCircleFill, BsChat } from "react-icons/bs";
import { FcStatistics } from "react-icons/fc";
import { LuSettings } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { HiOutlineLogin } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const Header = () => {
  const [open, setOpen] = useState(false);
const handleOpenOff = () => {
  setOpen(false)
}
  //удаление токена
const token = useSelector((state: RootState)=> state.signInSlice.token)
const removeToken = () => {
  localStorage.removeItem("token")
  window.location.reload()
}
  return (
    <header className={style.header}>
      <div className={style.header_content}>
        <Link to="/">
          <h3 className={style.content_h1}>
            <a className={style.header_logo} href="">
              <BsCheckCircleFill />
            </a>
            <a className={style.a_logo} href="">
              Pomodoro Tracker
            </a>
          </h3>
        </Link>
        <nav>
          <ul className={style.header_ul}>
            <li className={style.statistics}>
              <a className={style.header_stat} href="">
                <FcStatistics />
              </a>
              <Link className={style.header_link} to={"/statistics"}>
                Статистика
              </Link>
            </li>
            <li className={style.statistics}>
              <a className={style.header_settings} href="">
                <LuSettings />
              </a>
              <Link className={style.header_link} to={"/settings"}>
                Настройки
              </Link>
            </li>
            <li className={style.statistics}>
              <a className={style.header_ideas} href="">
                <BsChat />
              </a>
              <Link className={style.header_link} to={"/ideas"}>
                Идеи
              </Link>
            </li>
            <div className={style.header_launguage}>
              <a className={style.header_world} href="">
                <BiWorld />
              </a>
              <select className={style.header_laung} name="" id="">
                <option value="">Русский</option>
                <option value="">English</option>
              </select>
            </div>
            <li className={style.statistics}>
              <button
                onClick={() => setOpen(!open)}
                className={style.profil_btn}
              >
                <span className={style.header_user_login}>
                  <FaUserCircle />
                </span>
                Профиль
              </button>
              {open ? (
                <div className={style.state_profil}>
                  {!token ? (
                    <div className={style.handle_user}>
                      <Link onClick={handleOpenOff} className={style.entrance_use} to="/login">
                        <span className={style.icon}>
                          <HiOutlineLogin />
                        </span>
                        Вход
                      </Link>
                      <Link onClick={handleOpenOff} className={style.authorization_user} to="/auth">
                        <span className={style.icon}>
                          <ImExit />
                        </span>
                        Регестрация
                      </Link>
                    </div>
                  ) : (
                    <div className={style.profil}>
                      <button className={style.btn_profil} onClick={handleOpenOff}>
                        <span className={style.cg_profile}>
                          <CgProfile />
                        </span>
                        Профиль
                      </button>
                      <button className={style.btn_exit} onClick={removeToken}>
                        <span className={style.Im_exit}>
                          <ImExit />
                        </span>
                        Выход
                      </button>
                    </div>
                  )}
                </div>
              ) : null}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
