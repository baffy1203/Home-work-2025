import { useLocation } from 'react-router';
import { useState } from "react";
import concert from "../assets/concertt.png";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  return ( 
  <div>
    <section className="hero">
    <div className="container">
      <div className="hero-content">
        <h1>Гурт «Грим та Грім»</h1>

        <p>Справжній український рок, який гуркоче в серці.</p>

        <p className="hero-sub">
          «Грим та Грім» — це поєднання
          <span className="accent">потужних</span> гітарних рифів, чесних текстів
          і неймовірної енергії сцени. Ми граємо для тих, хто цінує живий
          звук, свободу та силу музики.
        </p>

        <p className="hero-sub">
          <span className="accent">Наші концерти</span> — це завжди контакт з
          залом, драйв і емоції. Приєднуйтесь до нас на найближчих виступах і
          відчуй цей саунд наживо!
        </p>
        <button
              className="btn"
              onClick={() => setIsOpen(true)}
            >
              ЗАМОВИТИ КВИТОК
            </button>
          </div>
        </div>
      </section>

      {/* POPUP */}
      {isOpen && (
        <div className="popup" onClick={() => setIsOpen(false)}>
          <div
            className="popup-box"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Квиток успішно додано!</p>
            <button onClick={() => setIsOpen(false)}>OK</button>
          </div>
        </div>
      )}

    
    <section id="about" className="section gradient-top about-section">
    <div className="container about-wrapper">
      <h2 className="about-text">Наша історія</h2>
      <div className="about">
        <div className="about-image">
        <img src={concert} />
        </div>

        

        <p>
          «Грим та Грім» народився з бажання створювати музику, яка
          відчувається серцем. Ми почали свій шлях у маленькій студії в центрі
          Києва, де кожен акорд, кожне слово було наповнене емоціями та
          переживаннями. Це було місце, де народжувались наші перші пісні, де
          ми вчились грати разом як єдиний організм.
        </p>

        <p>
          За роки нашої діяльності ми виступили на десятках сцен, від
          невеликих клубів до великих фестивалів. Наша музика — це поєднання
          традиційного року з сучасними елементами, що робить її унікальною та
          впізнаваною, Ми не боїмось експериментувати з звуком, додаючі
          електронні елементи або народні інструменти,
        </p>

        <p>
          Кожен наш виступ — це не просто концерт, а справжня подія, де ми
          ділимося своєю енергією з глядачами та створюємо неповторну
          атмосферу. М и віримо, що музика має силу об'єднувати людей,
          створювати спільноти та надихати на зміни.
        </p>
        <p>
          Наш колектив складається з досвідчених музикантів, кожен з яких
          привносить свій унікальний стиль та бачення. Максим створює
          неймовірні гітарні рифи, Олена зачаровує своїм вокалом, а Тарас тримає ритм, який змушуєсерця битися в унісон з музикою.
        </p>
      </div>
    </div>
  </section>
  </div>
  );
}