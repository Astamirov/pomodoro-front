
import { NavLink, Link } from "react-router-dom";
import style from "./Header.module.css";
import { BsCheckCircleFill, BsChat } from "react-icons/bs";
import { FcStatistics } from "react-icons/fc";
import { LuSettings } from "react-icons/lu";
import { BiWorld } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [russ, setRuss] = useState(false)
  

  function handleClickOnButton() {
    setOpen(!open)
  }
  const changeLanguage = (language: string) => {
    setOpen(false)
    setRuss(false)
  
    i18n.changeLanguage(language);
  }

  const changeLanguageRu = (language: string) => {
    setOpen(false)
    setRuss(true)
  
    i18n.changeLanguage(language);
  }

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
              <a className={style.header_stat} href=""><FcStatistics /></a>
              <Link className={style.header_link} to={"/statistics"}>{t("statistics")}</Link>
            </li>
            <li className={style.statistics}>
              <a className={style.header_settings} href=""><LuSettings /></a>
              <Link className={style.header_link} to={"/settings"}>{t("setting")}</Link>
            </li>
            <li className={style.statistics}>
              <a className={style.header_ideas} href=""><BsChat /></a>
              <Link className={style.header_link} to={"/ideas"}>{t("ideas")}</Link>
            </li>
            <div className={style.header_launguage}>
              <a className={style.header_world} href=""><BiWorld /></a>
              <div className={style.block_lang}>
                <button onClick={handleClickOnButton} className={style.lang_block} >{russ === true ? "Русский" : "English"}</button>
                {open && (<div className={style.language1}><button onClick={() => changeLanguage('en')}>English</button> <button onClick={() => changeLanguageRu('ru')}>Русский</button></div>)}
              </div>
            </div>      
            <li className={style.statistics}>
              <a className={style.header_user_login} href=""><FaUserCircle /></a>
              <Link className={style.header_link} to={'/login'}>{t("registration")}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
