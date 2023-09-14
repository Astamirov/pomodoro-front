import style from "./Footer.module.css";
import { FaApple, FaMicrosoft, FaTelegramPlane } from "react-icons/fa";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { SlSocialVkontakte } from "react-icons/sl";
import { RiWhatsappFill } from "react-icons/ri";

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.footer_container}>
        <div className={style.footer_content}>
          <div className={style.block_company}>
            <a href="https://www.apple.com/ru/">
              <div className={style.left_block}>
                <a className={style.icon_apple} href="">
                  <FaApple />
                </a>
                <div className={style.apple_content}>
                  <span className={style.apple_text}>Download on the</span>
                  <h2 className={style.store_apple}>Mac App Store</h2>
                </div>
              </div>
            </a>
            <a href="https://www.microsoft.com/ru-ru">
              <div className={style.right_block}>
                <a className={style.icon_microsoft} href="">
                  <FaMicrosoft />
                </a>
                <div className={style.microsoft_content}>
                  <span className={style.microsoft_text}>Get it from</span>
                  <h2 className={style.store_microsoft}>Microsoft</h2>
                </div>
              </div>
            </a>
          </div>
          <div className={style.icon_block}>
            <div className={style.footer_icons}>
              <div className={style.icon_flex}>
                <a className={style.icons} href="">
                  <AiOutlineTwitter />
                </a>
                <p className={style.text}>Tweet</p>
              </div>
              <div className={style.icon_flex}>
                <a className={style.icons} href="">
                  <BiLogoFacebook />
                </a>
                <p className={style.text}>Share</p>
              </div>
              <div className={style.icon_flex}>
                <a className={style.icons} href="">
                  <SlSocialVkontakte />
                </a>
                <p className={style.text}>Pin</p>
                <span className={style.pin_num}>4</span>
              </div>
              <div className={style.icon_flex}>
                <a className={style.icons} href="">
                  <AiFillInstagram />
                </a>
                <p className={style.text}>Share</p>
                <p className={style.share_num}>10</p>
              </div>
              <div className={style.icon_flex}>
                <a className={style.icons} href="">
                  <FaTelegramPlane />
                </a>
                <p className={style.text}>Send</p>
              </div>
              <div className={style.icon_flex}>
                <a className={style.icons} href="">
                  <RiWhatsappFill />
                </a>
                <p className={style.text}>Send</p>
              </div>
            </div>
          </div>
          <div className={style.footer_version}>
            <div className={style.version_block}>
              <div>
                <a className={style.icon_partner} href="#">
                  Version 22.0.4
                </a>
              </div>
              <div>
                <a className={style.icon_partner} href="#">
                  Privacy Policy
                </a>
              </div>
              <div>
                <a className={style.icon_partner} href="#">
                  Terms and Conditions
                </a>
              </div>
              <div>
                <a className={style.icon_partner} href="#">
                  Slack Community
                </a>
              </div>
            </div>
            <div className={style.footer_email}>
              <a className={style.footer_email_text} href="#">
                intocode@gmail.com <span></span>2023
              </a>
            </div>
            <div className={style.footer_bottom_text}>
              Pomodoro-Tracker is not related to the Pomodoro
              Technique™/Pomodoro™’s trademark holder Cirillo Company and
              respects its trademarks. Pomodoro Technique® and Pomodoro® are
              registered trademarks of Francesco Cirillo. All logos and marks
              contained herein are the property of their respective owners.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
