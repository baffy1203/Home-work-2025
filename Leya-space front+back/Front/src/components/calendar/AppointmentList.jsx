import AppointmentCard from "./AppointmentCard";

function AppointmentList({
  selectedDate,
  formattedDate,
  unavailableDates,
  filteredAppointments,
  setIsModalOpen,
  setEditingAppointmentId,
  setNewAppointment,
  toggleDayOff,
  handleEditAppointment,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">
            Записи на день
          </h2>

          <p className="text-[#9a8f94] mt-1">
            {selectedDate.toLocaleDateString("uk-UA", {
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <button
            onClick={() => {
              if (unavailableDates.includes(formattedDate)) {
                return;
              }

              setEditingAppointmentId(null);

              setNewAppointment({
                client: "",
                service: "",
                duration: 0,
                price: 0,
                startTime: "",
                endTime: "",
                status: "pending",
                phone: "",
                comment: "",
              });

              setIsModalOpen(true);
            }}
            className={`
              w-full sm:w-auto
              px-4 py-3
              rounded-2xl
              text-sm
              font-medium
              transition
              ${
                unavailableDates.includes(formattedDate)
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#7c5569] hover:opacity-90 text-white"
              }
            `}
          >
            + Новий запис
          </button>

          <button
            onClick={toggleDayOff}
            className="w-full sm:w-auto border border-[#e7d8df] px-4 py-3 rounded-2xl text-sm hover:bg-[#f7f3f1] transition"
          >
            {unavailableDates.includes(formattedDate)
              ? "Зробити робочим"
              : "Зробити вихідним"}
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {filteredAppointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onEdit={handleEditAppointment}
          />
        ))}
      </div>
    </div>
  );
}

export default AppointmentList;