import { useSelector } from "react-redux";
import { selectTheme } from "../redux/selectors";

export default function FooterMenu() {
  const theme = useSelector(selectTheme);

  return (
    <footer className={`footer ${theme}`}>
      <div className="container footer-inner">
        <div className="footer-left">
          <p>© 2025 Грим та Грім. Всі права захищені.</p>
          <p>booking@lotoplay • +38 (099) 123-45-67</p>
        </div>

        <div className="footer-right">
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">Facebook</a>
        </div>
      </div>
    </footer>
  );
}