import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiCalendar,
  FiUsers,
  FiScissors,
  FiBarChart2,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

function AppLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "Майстер";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-[#f7f3f1] flex">
      {/* MOBILE HEADER */}

      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm flex items-center justify-between px-5 py-4">
        <button onClick={() => setMenuOpen(true)}>
          <FiMenu size={28} />
        </button>

        <h1 className="text-2xl font-semibold text-[#7c5569]">Leya Space</h1>

        <div className="w-7"></div>
      </div>

      {/* MOBILE MENU */}

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="bg-white w-72 h-full p-6 flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-semibold text-[#7c5569]">
                Leya Space
              </h2>

              <button onClick={() => setMenuOpen(false)}>
                <FiX size={30} />
              </button>
            </div>

            <nav className="flex flex-col gap-5 flex-1">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                🏠 Головна
              </Link>

              <Link to="/calendar" onClick={() => setMenuOpen(false)}>
                📅 Календар
              </Link>

              <Link to="/clients" onClick={() => setMenuOpen(false)}>
                👥 Клієнти
              </Link>

              <Link to="/services" onClick={() => setMenuOpen(false)}>
                ✂️ Послуги
              </Link>

              <Link to="/statistics" onClick={() => setMenuOpen(false)}>
                📊 Статистика
              </Link>

              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                👤 Профіль
              </Link>
            </nav>

            <button
              onClick={handleLogout}
              className="text-left text-red-500 mt-8"
            >
              🚪 Вийти
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}

      <aside className="hidden md:flex w-64 bg-white border-r border-[#eee] p-6 flex-col">
        <div>
          <h1 className="text-3xl font-semibold text-[#7c5569]">Leya Space</h1>

          <p className="text-sm text-[#9a8f94] mt-1">
            Простір краси та записів
          </p>
        </div>

        <nav className="mt-12 flex flex-col gap-3 flex-1">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#f7f3f1]"
          >
            <FiHome />
            Головна
          </Link>

          <Link
            to="/calendar"
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#f7f3f1]"
          >
            <FiCalendar />
            Календар
          </Link>

          <Link
            to="/clients"
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#f7f3f1]"
          >
            <FiUsers />
            Клієнти
          </Link>

          <Link
            to="/services"
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#f7f3f1]"
          >
            <FiScissors />
            Послуги
          </Link>

          <Link
            to="/statistics"
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#f7f3f1]"
          >
            <FiBarChart2 />
            Статистика
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-[#f7f3f1]"
          >
            <FiUser />
            Профіль
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-500 hover:text-red-600 mt-6"
        >
          <FiLogOut />
          Вийти
        </button>
      </aside>

      {/* MAIN */}

      <main className="flex-1 p-4 md:p-8 pt-24 md:pt-8">{children}</main>
    </div>
  );
}

export default AppLayout;
