import { Link } from "react-router-dom";
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
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [russ, setRuss] = useState(false)
  
  const user = useSelector((state: RootState) => state.signInSlice.user)
  const token = useSelector((state: RootState)=> state.signInSlice.token)

const handleOpenOff = () => {
  setOpen(false)
}
function handleClickOnButton() {
  setOpen2(!open2)
}
const changeLanguage = (language: string) => {
  setOpen2(false)
  setRuss(false)

  i18n.changeLanguage(language);
}

const changeLanguageRu = (language: string) => {
  setOpen2(false)
  setRuss(true)

  i18n.changeLanguage(language);
}


  //удаление токена
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
              <Link className={style.header_link} to={"/stat"}>{t("statistics")}</Link>

            </li>
            <li className={style.statistics}>
              <a className={style.header_settings} href="">
                <LuSettings />
              </a>
              <Link className={style.header_link} to={"/settings"}>{t("setting")}</Link>

            </li>
            <li className={style.statistics}>
              <a className={style.header_ideas} href="">
                <BsChat />
              </a>
              <Link className={style.header_link} to={"/ideas"}>{t("ideas")}</Link>

            </li>
            <div className={style.header_launguage}>
              <a className={style.header_world} href="">
                <BiWorld />
              </a>
              <div className={style.block_lang}>
                <button onClick={handleClickOnButton} className={style.lang_block} >{russ === true ? "Русский" : "English"}</button>
                {open2 && (<div className={style.language1}><button onClick={() => changeLanguage('en')}>English</button> <button onClick={() => changeLanguageRu('ru')}>Русский</button></div>)}
              </div>
            </div>
            <li className={style.statistics}>
              <button
                onClick={() => setOpen(!open)}
                className={style.profil_btn}
              >
                <span className={style.header_user_login}>
                  <FaUserCircle />
                </span>
                {t("prof")}
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
                        <Link className={style.link_profil} to="/prof">Профиль</Link>
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