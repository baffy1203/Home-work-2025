import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

import authBg from "../assets/images/auth-bg.png";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return alert("Користувача не знайдено");
    }

    if (
      user.email !== email ||
      user.password !== password
    ) {
      return alert("Невірний email або пароль");
    }

    localStorage.setItem("isLoggedIn", "true");

    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f7f3f1] flex items-center justify-center p-6">

      <div className="w-full max-w-7xl bg-white rounded-[36px] overflow-hidden shadow-xl grid lg:grid-cols-2">

        {/* LEFT */}

        <div className="hidden lg:block relative overflow-hidden">

          <img
            src={authBg}
            alt="Beauty salon"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-white/10" />

          <div className="relative z-10 h-full flex flex-col justify-between p-16 text-[#2c2226]">

            <div>
              <h1 className="text-5xl font-serif">
                Leya Space
              </h1>

              <p className="mt-2 text-xl">
                Простір краси та записів
              </p>
            </div>

            <div className="mb-10">

              {/* <h2 className="text-6xl font-light leading-tight">
                Ваш простір
                <br />
                краси та
                <br />
                організації
              </h2> */}

              <p className="mt-8 text-xl max-w-md">
                Керуйте записами,
                клієнтами та послугами
                легко і з любов'ю 💗
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="p-10 lg:p-16 flex flex-col justify-center">

          <div className="flex justify-end text-gray-600 mb-10">

            <span>Немає акаунта?</span>

            <Link
              to="/register"
              className="ml-2 font-semibold text-[#7c5569]"
            >
              Зареєструватися
            </Link>

          </div>

          <h1 className="text-5xl font-bold text-[#2c2226]">
            Вхід
          </h1>

          <p className="text-gray-500 mt-3 mb-10 text-lg">
            Увійдіть у свій акаунт
          </p>

          <div className="space-y-5">

            <div className="relative">

              <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full pl-14 p-5 rounded-2xl border border-[#ece6e4] focus:outline-none focus:ring-2 focus:ring-[#7c5569]"
              />

            </div>

            <div className="relative">

              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full pl-14 p-5 rounded-2xl border border-[#ece6e4] focus:outline-none focus:ring-2 focus:ring-[#7c5569]"
              />

            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-[#7c5569] hover:bg-[#6d485b] text-white text-xl py-5 rounded-2xl transition"
            >
              Увійти
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default LoginPage;