import { NavLink, Link } from "react-router-dom";
import style from "./Header.module.css";
import { BsCheckCircleFill, BsChat } from "react-icons/bs";
import { FcStatistics } from "react-icons/fc";
import { LuSettings } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.header_content}>
        <Link to='/'>
          <h3 className={style.content_h1}>
            <a className={style.header_logo} href="">
              <BsCheckCircleFill />
            </a>
            <a className={style.a_logo} href="">Pomodoro Tracker</a>
          </h3>
        </Link>
        <nav>
          <ul className={style.header_ul}>
            <li className={style.statistics}>
              <a className={style.header_stat} href=""><FcStatistics/></a>
              <Link className={style.header_link} to={"/statistics"}>Статистика</Link>
            </li>
            <li className={style.statistics}>
              <a className={style.header_settings} href=""><LuSettings/></a>
              <Link className={style.header_link} to={"/settings"}>Настройки</Link>
            </li>
            <li className={style.statistics}>
              <a className={style.header_ideas} href=""><BsChat/></a>
              <Link className={style.header_link} to={"/ideas"}>Идеи</Link>
            </li>
           <div className={style.header_launguage}>
            <a className={style.header_world} href=""><BiWorld/></a>
             <select className={style.header_laung} name="" id="">
              <option value="">Русский</option>
              <option value="">English</option>
            </select>
           </div>
           <li className={style.statistics}>
            <a className={style.header_user_login} href=""><FaUserCircle/></a>
            <Link className={style.header_link} to={'/login'}>Регестрация</Link>
           </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
