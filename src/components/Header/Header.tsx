// import {NavLink} from 'react-router-dom'

const Header = () => {
  return (
    <header>
    <nav>
      <ul>
        <li>
          Pomodoro Tracker
        </li>
        <li>
          Статистика
        </li>
        <li>
          Настройки
        </li>
      </ul>
    </nav>
    <div className="user-actions">
      <button>Русский</button>
      <button>Войти / Зарегистрироваться</button>
    </div>
  </header>
  )
}

export default Header
