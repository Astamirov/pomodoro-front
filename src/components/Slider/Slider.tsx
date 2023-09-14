import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './Slider.module.css'
import { useTranslation } from "react-i18next";


const Sliders = () => {
  const { t, i18n } = useTranslation();


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={style.slider}>
      <Slider {...settings}>
        <div className={style.two}>
          <h1 className={style.first_h1}>{t("what")}</h1>
          <p className={style.description_pomodoro}>
            {t("the")}
          </p>
          <p className={style.documentiteon_pomodoro}>
            {t("aim")}
          </p>
        </div>
        <div className={style.block_two}>
          <h1 className={style.h3}>{t("goals")}</h1>
          <p className={style.Goals_pomodoro}>
            {t("will")}
          </p>
          <ul className={style.ul_pomodoro}>
            <li>{t("linked")}</li>
            <li>
              {t("focus")}
            </li>
            <li>{t("incr")}</li>
            <li>{t("boost")}</li>
            <li>{t("your")}</li>
            <li>
              {t("refine")}
            </li>
            <li>{t("improve")}</li>
            <li>
              {t("keep")}
            </li>
          </ul>
        </div>
        <div className={style.block_three}>
          <h1 className={style.h2}>{t("basics")}</h1>
          <p className={style.description}>
            {t("at")}
          </p>
          <p className={style.start_work}>{t("working")}</p>
          <div className={style.task_block}>
            <div>{t("timer")}</div>
            <div>{t("work")}</div>
            <div>{t("take")}</div>
          </div>
          <p className={style.text_timer}>
          {t("after")}
          </p>
        </div>
        <div className={style.block4}>
          <h1 className={style.last_h3}>{t("rules")}</h1>
          <ul>
            <li>{t("task")}</li>
            <li>
            {t("less")}
            </li>
            <li>{t("once")}</li>
            <li>{t("next")}</li>
            <li>{t("login")}</li>
            <li>
            {t("used")}
            </li>
          </ul>
        </div>
      </Slider>
    </div>
  )
}

export default Sliders;