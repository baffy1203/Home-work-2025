function ClientHistory({ appointments, client }) {
  const history = appointments
    .filter(
      (appointment) =>
        appointment.client === client.name ||
        (client.phone &&
          appointment.phone === client.phone)
    )
    .sort((a, b) => b.date.localeCompare(a.date));

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">

      <h3 className="font-semibold text-lg mb-3">
        Історія візитів
      </h3>

      <div className="flex flex-col gap-3">

        {history.map((visit) => (
          <div
            key={visit.id}
            className="bg-[#f7f3f1] rounded-2xl p-4 flex justify-between items-center"
          >

            <div>

              <div className="font-medium">
                {visit.service}
              </div>

              <div className="text-sm text-gray-500 mt-1">
                {visit.date} • {visit.time}
              </div>

            </div>

            <div className="font-semibold text-[#7c5569]">
              {visit.price || 0} грн
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ClientHistory;