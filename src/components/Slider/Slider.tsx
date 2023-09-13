import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './Slider.module.css'

const Sliders = () => {

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
          <h1 className={style.first_h1}>What is it?</h1>
          <p className={style.description_pomodoro}>
            The Pomodoro Technique is a time management method that can be used
            for any task. For many people, time is an enemy. The anxiety
            triggered by “the ticking clock”, especially when it involves a
            deadline, leads to ineffective work and study habits which in turn
            lead to procrastination.
          </p>
          <p className={style.documentiteon_pomodoro}>
            The aim of the Pomodoro Technique is to use time as a valuable ally
            in accomplishing what we want to do in the way we want to do it, and
            to enable us to improve continually the way we work or study.
          </p>
        </div>
        <div className={style.block_two}>
          <h1 className={style.h3}>The Goals</h1>
          <p className={style.Goals_pomodoro}>
            The Pomodoro Technique will provide a simple tool/process for
            improving productivity (your own and that of your team members)
            which can do the following:
          </p>
          <ul className={style.ul_pomodoro}>
            <li>Alleviate anxiety linked to beginning</li>
            <li>
              Enhance focus and concentration by cutting down on interruptions
            </li>
            <li>Increase awareness of your decisions</li>
            <li>Boost motivation and keep it constant</li>
            <li>Bolster the determination to achieve your goals</li>
            <li>
              Refine the estimation process, both in qualitative and
              quantitative terms
            </li>
            <li>Improve your work or study process</li>
            <li>
              Strengthen your resolve to keep on applying yourself in the face
              of complex situations
            </li>
          </ul>
        </div>
        <div className={style.block_three}>
          <h1 className={style.h2}>The Basics</h1>
          <p className={style.description}>
            At the beginning of each day select the tasks you need to complete
            and put them on the TODO list above.
          </p>
          <p className={style.start_work}>Start working:</p>
          <div className={style.task_block}>
            <div>1. Start the Pomodoro timer</div>
            <div>2. Work until the Pomodoro rings</div>
            <div>3. Take a short break (3-5 minutes)</div>
          </div>
          <p className={style.text_timer}>
            Keep on working, Pomodoro after Pomodoro, until the task at hand is
            finished. Every 4 Pomodoros take a longer break, (15–30 minutes).
          </p>
        </div>
        <div className={style.block4}>
          <h1 className={style.last_h3}>Rules & Tips</h1>
          <ul>
            <li>If a task takes more than 5–7 Pomodoros, break it down</li>
            <li>
              If it takes less than one Pomodoro, add it up, and combine it with
              another task
            </li>
            <li>Once a Pomodoro begins, it has to ring</li>
            <li>The next Pomodoro will go better</li>
            <li>Login to the service and track your progress</li>
            <li>
              The Pomodoro Technique shouldn’t be used for activities you do in
              your free time. Enjoy free time!
            </li>
          </ul>
        </div>
      </Slider>   
    </div>
  )
}

export default Sliders;