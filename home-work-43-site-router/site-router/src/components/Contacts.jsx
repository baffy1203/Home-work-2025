import { useLocation } from "react-router";

export default function Contacts() {
  return (
    <section className="section gradient-bottom">
      <div className="container">
        <h2 className="section-title">Зв'яжись з нами</h2>
        <p className="section-subtitle">
          Хочеш заказати виступ або маєш питання? Пиши!
        </p>

        <div className="contact">
          <form id="form">
            <div className="form-row">
              <div className="form-group">
                <label>Ім'я</label>
                <input type="text" id="name" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" id="email" />
              </div>
            </div>

            <div className="form-group">
              <label>Повідомлення</label>
              <textarea
                id="message"
                placeholder="Розкажи про свої ідеї..."
              ></textarea>
            </div>

            <button className="btn">Відправити</button>
          </form>
          <div className="map-card">
            <p>Наше місцезнаходження</p>
            <div className="map">
              <iframe src="https://maps.google.com/maps?q=kyiv&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

//інпути не налаштовані
