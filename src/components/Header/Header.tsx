import { NavLink } from "react-router-dom"

export const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Pomodoro Tracker</NavLink>
          </li>
          <li>
            <NavLink to="/statistics">Статистика</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Настройки</NavLink>
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
