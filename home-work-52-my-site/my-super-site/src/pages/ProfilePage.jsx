import { useState } from "react";

function ProfilePage() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("masterProfile");

    return saved
      ? JSON.parse(saved)
      : {
          name: "",
          phone: "",
          instagram: "",
          city: "",
          category: "nails",
          about: "",
          workingHours: {
            start: "09:00",
            end: "20:00",
          },
        };
  });

  const handleSave = () => {
    localStorage.setItem("masterProfile", JSON.stringify(profile));

    alert("Профіль успішно збережено");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold mb-8">Профіль майстра</h1>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            placeholder="Ім'я"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name: e.target.value,
              })
            }
            className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
          />

          <input
            type="tel"
            inputMode="numeric"
            maxLength={13}
            placeholder="+380XXXXXXXXX"
            value={profile.phone}
            onChange={(e) => {
              let value = e.target.value;

              value = value.replace(/[^\d+]/g, "");

              if (value.startsWith("++")) {
                value = "+" + value.slice(2);
              }

              setProfile({
                ...profile,
                phone: value.slice(0, 13),
              });
            }}
            className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
          />

          <input
            placeholder="Instagram"
            value={profile.instagram}
            onChange={(e) =>
              setProfile({
                ...profile,
                instagram: e.target.value,
              })
            }
            className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
          />

          <input
            placeholder="Місто"
            value={profile.city}
            onChange={(e) =>
              setProfile({
                ...profile,
                city: e.target.value,
              })
            }
            className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Категорія</h2>

          <select
            value={profile.category}
            onChange={(e) =>
              setProfile({
                ...profile,
                category: e.target.value,
              })
            }
            className="w-full bg-[#f7f3f1] p-4 rounded-2xl outline-none"
          >
            <option value="nails">Манікюр</option>
            <option value="lashes">Вії</option>
            <option value="brows">Брови</option>
            <option value="makeup">Макіяж</option>
          </select>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Робочі години</h2>

          <div className="flex gap-4">
            <input
              type="time"
              value={profile.workingHours.start}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  workingHours: {
                    ...profile.workingHours,
                    start: e.target.value,
                  },
                })
              }
              className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
            />

            <input
              type="time"
              value={profile.workingHours.end}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  workingHours: {
                    ...profile.workingHours,
                    end: e.target.value,
                  },
                })
              }
              className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
            />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Про себе</h2>

          <textarea
            rows={5}
            placeholder="Розкажіть про себе..."
            value={profile.about}
            onChange={(e) =>
              setProfile({
                ...profile,
                about: e.target.value,
              })
            }
            className="w-full bg-[#f7f3f1] p-4 rounded-2xl outline-none resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-8 bg-[#7c5569] text-white px-8 py-4 rounded-2xl hover:opacity-90 transition"
        >
          Зберегти зміни
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
