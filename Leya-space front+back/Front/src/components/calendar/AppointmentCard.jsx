function AppointmentCard({
  appointment,
  onEdit,
}) {
  return (
    <div
      onClick={() => onEdit(appointment)}
      className="flex items-center justify-between p-5 bg-[#f7f3f1] rounded-3xl cursor-pointer hover:bg-[#efe8e5] transition"
    >
      <div>
        <h3 className="font-semibold">
          {appointment.client}
        </h3>

        <p className="text-sm text-[#9a8f94] mt-1">
          {appointment.service} • {appointment.time}
        </p>

        <p className="text-sm text-[#9a8f94] mt-1">
          {appointment.phone}
        </p>

        {appointment.comment && (
          <p className="text-sm text-[#7c5569] mt-2">
            {appointment.comment}
          </p>
        )}
      </div>

      <span
        className={`
          px-4 py-2 rounded-xl text-sm
          ${
            appointment.status === "confirmed"
              ? "bg-[#e8d8e0] text-[#7c5569]"
              : appointment.status === "pending"
              ? "bg-[#fde7d9] text-[#c7774d]"
              : "bg-[#dff4e4] text-[#3d8b5a]"
          }
        `}
      >
        {appointment.status === "confirmed" &&
          "Підтверджено"}

        {appointment.status === "pending" &&
          "Очікується"}

        {appointment.status === "completed" &&
          "Завершено"}
      </span>
    </div>
  );
}

export default AppointmentCard;