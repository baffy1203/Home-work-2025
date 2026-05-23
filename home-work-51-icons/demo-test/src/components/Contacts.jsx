import { useState } from "react";
import ContactForm from "./ContactForm";
import { ImPhone } from "react-icons/im";
import { HexColorPicker } from "react-colorful";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


export default function Contacts() {
  const [headerColor, setColor] = useState("#FFFFFF");
  const [startDate, setStartDate] = useState(new Date());
  return (
    <section className="section gradient-bottom">
      <div className="container">
        <h2 className="section-title">
          Зв'яжись з нами{" "}
          <ImPhone
            style={{
              color: "#ff0000",
              fontSize: "1.1rem",
            }}
          />
        </h2>

        <p className="section-subtitle" style={{ color: headerColor }}>
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
        <div className="tools-block">

<div className="color-picker-block">
  <HexColorPicker
    color={headerColor}
    onChange={setColor}
  />
</div>

<div className="date-picker-block">
  <h3>Виберіть дату виступу:</h3>

  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    dateFormat="dd/MM/yyyy"
  />

  <p>
    Вибрана дата: {startDate.toDateString()}
  </p>
</div>

</div>
      </div>
    </section>
  );
}
