export default function Home() {
  return (
    <section className="hero">
    <div className="container">
      <div className="hero-content">
        <h1>Гурт «Грим та Грім»</h1>

        <p>Справжній український рок, який гуркоче в серці.</p>

        <p className="hero-sub">
          «Грим та Грім» — це поєднання
          <span className="accent"> потужних</span> гітарних рифів, чесних текстів
          і неймовірної енергії сцени. Ми граємо для тих, хто цінує живий
          звук, свободу та силу музики.
        </p>

        <p className="hero-sub">
          <span className="accent">Наші концерти</span> — це завжди контакт з
          залом, драйв і емоції. Приєднуйтесь до нас на найближчих виступах і
          відчуй цей саунд наживо!
        </p>
        <button className="btn" id="buyTicket">ЗАМОВИТИ КВИТОК</button>
      </div>
    </div>
  </section>
  );
}