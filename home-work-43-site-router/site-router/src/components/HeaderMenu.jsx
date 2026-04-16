import { useState } from "react";
import { NavLink } from "react-router";

export default function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
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
      </div>
    </header>
  );
}