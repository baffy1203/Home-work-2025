import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
} from "react-icons/fi";

import authBg from "../assets/images/auth-bg.png";

function RegisterPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = () => {
    if (
      !user.name ||
      !user.email ||
      !user.phone ||
      !user.password
    ) {
      return alert("Заповніть всі поля");
    }

    if (user.password !== user.confirmPassword) {
      return alert("Паролі не співпадають");
    }

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Реєстрація успішна");

    navigate("/login");
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

<div className="absolute inset-0 bg-white/15"></div>

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

    <h2 className="text-6xl font-light leading-tight">
      Ваш простір
      <br />
      краси та
      <br />
      організації
    </h2>

    <p className="mt-8 text-xl max-w-md">
      Керуйте записами,
      клієнтами та послугами
      легко і з любов'ю 💗
    </p>

  </div>

</div>

</div>

        {/* RIGHT */}

        <div className="p-10 lg:p-16">

          <div className="flex justify-end text-gray-600 mb-10">

            <span>
              Вже маєте акаунт?
            </span>

            <Link
              to="/login"
              className="ml-2 font-semibold text-[#7c5569]"
            >
              Увійти
            </Link>

          </div>

          <h1 className="text-5xl font-bold text-[#2c2226]">
            Створіть акаунт
          </h1>

          <p className="text-gray-500 mt-3 mb-10 text-lg">
            Реєстрація займає менше хвилини
          </p>

          <div className="space-y-5">

            {/* Name */}

            <div className="relative">

              <FiUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                placeholder="Ім'я та прізвище"
                value={user.name}
                onChange={(e) =>
                  setUser({
                    ...user,
                    name: e.target.value,
                  })
                }
                className="w-full pl-14 p-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5569]"
              />

            </div>

            {/* Email */}

            <div className="relative">

              <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
                className="w-full pl-14 p-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5569]"
              />

            </div>

            {/* Phone */}

            <div className="relative">

              <FiPhone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="tel"
                placeholder="+380..."
                value={user.phone}
                onChange={(e) =>
                  setUser({
                    ...user,
                    phone: e.target.value.replace(/[^\d+]/g, ""),
                  })
                }
                className="w-full pl-14 p-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5569]"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="password"
                placeholder="Пароль"
                value={user.password}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: e.target.value,
                  })
                }
                className="w-full pl-14 p-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5569]"
              />

            </div>

            {/* Confirm */}

            <div className="relative">

              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

              <input
                type="password"
                placeholder="Підтвердіть пароль"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({
                    ...user,
                    confirmPassword:
                      e.target.value,
                  })
                }
                className="w-full pl-14 p-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7c5569]"
              />

            </div>

            <button
              onClick={handleRegister}
              className="w-full bg-[#7c5569] hover:bg-[#6d485b] text-white text-xl rounded-2xl py-5 transition"
            >
              Зареєструватися
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default RegisterPage;