import { useMemo } from "react";

const user = JSON.parse(localStorage.getItem("user"));
const userName = user?.name || "Майстер";

function DashboardPage() {
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");

  const today = new Date().toLocaleDateString("sv-SE");

  const todayAppointments = appointments.filter(
    (appointment) => appointment.date === today
  );

  const todayIncome = todayAppointments.reduce(
    (sum, appointment) => sum + Number(appointment.price || 0),
    0
  );

  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();

  const currentYear = currentDate.getFullYear();

  const monthAppointments = appointments.filter((appointment) => {
    const date = new Date(appointment.date);

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const monthIncome = monthAppointments.reduce(
    (sum, appointment) => sum + Number(appointment.price || 0),
    0
  );

  const clients = useMemo(() => {
    const unique = new Set();

    appointments.forEach((appointment) => {
      unique.add(appointment.phone || appointment.client);
    });

    return unique.size;
  }, [appointments]);

  const nextAppointments = [...todayAppointments]
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 5);

  const averageCheck =
    appointments.length > 0
      ? Math.round(
          appointments.reduce(
            (sum, appointment) => sum + Number(appointment.price || 0),
            0
          ) / appointments.length
        )
      : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-[#2c2226]">
          Вітаємо, {userName} 👋
        </h1>

        <p className="text-[#9a8f94] mt-2">Гарного та продуктивного дня</p>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Огляд бізнесу</h1>

        <p className="text-gray-500 mt-2">Статистика та найближчі записи</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-3xl">
          <div className="text-gray-500">Записів сьогодні</div>

          <div className="text-3xl font-bold mt-3">
            {todayAppointments.length}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl">
          <div className="text-gray-500">Дохід сьогодні</div>

          <div className="text-3xl font-bold mt-3 text-[#7c5569]">
            {todayIncome} грн
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl">
          <div className="text-gray-500">Клієнтів</div>

          <div className="text-3xl font-bold mt-3">{clients}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl">
          <div className="text-gray-500">Середній чек</div>

          <div className="text-3xl font-bold mt-3">{averageCheck} грн</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl">
          <h2 className="text-xl font-semibold mb-5">Найближчі записи</h2>

          <div className="flex flex-col gap-3">
            {nextAppointments.length === 0 && (
              <div className="text-gray-400">На сьогодні записів немає</div>
            )}

            {nextAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-[#f7f3f1] p-4 rounded-2xl flex justify-between"
              >
                <div>
                  <div className="font-semibold">{appointment.client}</div>

                  <div className="text-gray-500">{appointment.service}</div>
                </div>

                <div className="font-semibold">{appointment.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl">
          <h2 className="text-xl font-semibold mb-5">Статистика місяця</h2>

          <div className="flex flex-col gap-4">
            <div className="bg-[#f7f3f1] p-4 rounded-2xl">
              <div className="text-gray-500">Дохід</div>

              <div className="text-2xl font-bold">{monthIncome} грн</div>
            </div>

            <div className="bg-[#f7f3f1] p-4 rounded-2xl">
              <div className="text-gray-500">Записів</div>

              <div className="text-2xl font-bold">
                {monthAppointments.length}
              </div>
            </div>

            <div className="bg-[#f7f3f1] p-4 rounded-2xl">
              <div className="text-gray-500">Клієнтів</div>

              <div className="text-2xl font-bold">{clients}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
