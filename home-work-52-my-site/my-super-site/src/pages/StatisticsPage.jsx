import { useMemo } from "react";

function StatisticsPage() {
  const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth();

  const currentYear = currentDate.getFullYear();

  const monthlyAppointments = appointments.filter((appointment) => {
    const date = new Date(appointment.date);

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  const yearlyAppointments = appointments.filter((appointment) => {
    const date = new Date(appointment.date);

    return date.getFullYear() === currentYear;
  });

  const monthlyIncome = monthlyAppointments.reduce(
    (sum, appointment) => sum + Number(appointment.price || 0),
    0
  );

  const yearlyIncome = yearlyAppointments.reduce(
    (sum, appointment) => sum + Number(appointment.price || 0),
    0
  );
  const stats = useMemo(() => {
    const totalIncome = appointments.reduce(
      (sum, appointment) => sum + Number(appointment.price || 0),
      0
    );

    const totalAppointments = appointments.length;

    const uniqueClients = [
      ...new Set(
        appointments.map(
          (appointment) => appointment.phone || appointment.client
        )
      ),
    ];

    const averageCheck =
      totalAppointments > 0 ? Math.round(totalIncome / totalAppointments) : 0;

    const clientVisits = {};

    appointments.forEach((appointment) => {
      const key = appointment.phone || appointment.client;

      clientVisits[key] = (clientVisits[key] || 0) + 1;
    });

    const newClients = Object.values(clientVisits).filter(
      (count) => count === 1
    ).length;

    const regularClients = Object.values(clientVisits).filter(
      (count) => count >= 3
    ).length;

    const services = {};

    appointments.forEach((appointment) => {
      services[appointment.service] = (services[appointment.service] || 0) + 1;
    });

    let popularService = "Немає даних";

    let max = 0;

    Object.entries(services).forEach(([service, count]) => {
      if (count > max) {
        max = count;
        popularService = service;
      }
    });

    return {
      totalIncome,
      totalAppointments,
      clients: uniqueClients.length,
      averageCheck,
      newClients,
      regularClients,
      popularService,
    };
  }, [appointments]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Статистика</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm">
        <div className="bg-white p-6 rounded-3xl shadow-sm">
  <div className="text-gray-500">
    За весь час
  </div>

  <div className="text-3xl font-bold mt-3 text-[#7c5569]">
    {stats.totalIncome} грн
  </div>
</div>

<div className="bg-white p-6 rounded-3xl shadow-sm">
  <div className="text-gray-500">
    За місяць
  </div>

  <div className="text-3xl font-bold mt-3">
    {monthlyIncome} грн
  </div>
</div>

<div className="bg-white p-6 rounded-3xl shadow-sm">
  <div className="text-gray-500">
    За рік
  </div>

  <div className="text-3xl font-bold mt-3">
    {yearlyIncome} грн
  </div>
</div>

          <div className="text-3xl font-bold mt-3 text-[#7c5569]">
            {stats.totalIncome} грн
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="text-gray-500">Записи</div>

          <div className="text-3xl font-bold mt-3">
            {stats.totalAppointments}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="text-gray-500">Клієнти</div>

          <div className="text-3xl font-bold mt-3">{stats.clients}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="text-gray-500">Середній чек</div>

          <div className="text-3xl font-bold mt-3">
            {stats.averageCheck} грн
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="text-gray-500">Нові клієнти</div>

          <div className="text-3xl font-bold mt-3">{stats.newClients}</div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm">
          <div className="text-gray-500">Постійні клієнти</div>

          <div className="text-3xl font-bold mt-3">{stats.regularClients}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 mt-8 shadow-sm">
        <div className="text-gray-500">Найпопулярніша послуга</div>

        <div className="text-2xl font-bold mt-3 text-[#7c5569]">
          {stats.popularService}
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
