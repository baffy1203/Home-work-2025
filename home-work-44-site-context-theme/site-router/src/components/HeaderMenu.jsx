import { NavLink } from 'react-router';
import { useContext, useState } from "react";
import ThemeContext from "../contexts/ThemeContext";


export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
<button className="theme-toggle" onClick={toggleTheme}>
  <span className="icon sun">☀️</span>
  <span className="icon moon">🌙</span>
</button>
  );
}

export default function HeaderMenu() {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`header ${theme}`}>
      <div className="nav container">
        <div className="logo">G&G</div>

        <div
          className="burger"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </div>

        <nav className={isOpen ? "menu active" : "menu"}>
          <NavLink to="/about">Про гурт</NavLink>
          <NavLink to="/concerts">Концерти</NavLink>
          <NavLink to="/gallery">Галерея</NavLink>
          <NavLink to="/contacts">Контакти</NavLink>
        </nav>

        {/* 🔥 ОСЬ ТУТ КНОПКА */}
        <ThemeToggle />
      </div>
    </header>
  );
}
