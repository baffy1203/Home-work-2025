import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setLanguage } from '../redux/actions';
import { selectTheme, selectLanguage } from '../redux/selectors';
import { useState } from "react";


export function ThemeToggle() {
  const dispatch = useDispatch();

  return (
    <button className="theme-toggle" onClick={() => dispatch(toggleTheme())}>
      <span className="icon sun">☀️</span>
      <span className="icon moon">🌙</span>
    </button>
  );
}


export function LanguageToggle() {
  const dispatch = useDispatch();
  const language = useSelector(selectLanguage);

  const toggleLang = () => {
    dispatch(setLanguage(language === 'ua' ? 'en' : 'ua'));
  };

  return (
    <button className="lang-toggle" onClick={toggleLang}>
      {language === 'ua' ? 'UA 🇺🇦' : 'EN 🇬🇧'}
    </button>
  );
}

export default function HeaderMenu() {
  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);
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
          <NavLink to="/about">
            {language === 'ua' ? 'Про гурт' : 'About'}
          </NavLink>

          <NavLink to="/concerts">
            {language === 'ua' ? 'Концерти' : 'Concerts'}
          </NavLink>

          <NavLink to="/gallery">
            {language === 'ua' ? 'Галерея' : 'Gallery'}
          </NavLink>

          <NavLink to="/contacts">
            {language === 'ua' ? 'Контакти' : 'Contacts'}
          </NavLink>
        </nav>

       
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
}