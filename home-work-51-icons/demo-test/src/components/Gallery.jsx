import { useLocation } from 'react-router';
import guitar from "../assets/guitar2.png";
import singer from "../assets/olena.png";
import transs from "../assets/transs.png";
export default function Gallery() {

  
  return (
    <section className="section">
    <div className="container">
      <h2>Учасники гурту</h2>

      <div className="members">
        <div className="card">
        <img src={guitar} />
          <p>Максим — гітара</p>
        </div>
        <div className="card">
        <img src={singer} />
          <p>Олена — вокал</p>
        </div>
        <div className="card">
        <img src={transs} />
          <p>Тарас — барабани</p>
        </div>
      </div>
    </div>
  </section>
  );
}