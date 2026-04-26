import { useState } from "react";

export default function Concerts() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="concerts" className="section">
      <div className="container">
        <div className="table-wrapper">
          <div className="table-header">
            <h2>Найближчі концерти</h2>
          </div>

          <table>
            <thead>
              <tr>
                <th>Місто / Заклад</th>
                <th>К-сть місць</th>
                <th>Дата і час</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {[
                ["Київ – Docker-G Pub", 250, "25.10.2025, 19:00"],
                ["Львів – !FESTrepublic", 400, "01.11.2025, 20:00"],
                ["Одеса – Зелен театр", 700, "09.11.2025, 19:30"],
                ["Харків – ArtZavod", 500, "16.11.2025, 19:00"],
              ].map((item, index) => (
                <tr key={index}>
                  <td>{item[0]}</td>
                  <td>{item[1]}</td>
                  <td>{item[2]}</td>
                  <td>
                    <button
                      className="btn small"
                      onClick={() => setIsOpen(true)}
                    >
                      Замовити квиток
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
    </section>
  );
}