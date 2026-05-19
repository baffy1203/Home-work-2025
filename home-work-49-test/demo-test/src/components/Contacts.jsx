import { contactSchema } from "../schemas/formSchemas";
import ContactForm from "./ContactForm";

export default function Contacts() {
  return (
    <section className="section gradient-bottom">
      <div className="container">
        <h2 className="section-title">Зв'яжись з нами</h2>
        <p className="section-subtitle">
          Хочеш заказати виступ або маєш питання? Пиши!
        </p>

        <div className="contact">
          <ContactForm />

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