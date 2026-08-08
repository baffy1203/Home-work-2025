function AppointmentModal({
  isOpen,
  editingAppointmentId,
  setIsModalOpen,
  newAppointment,
  handleChange,
  availableServices,
  availableTimeSlots,
  handleDeleteAppointment,
  handleAddAppointment,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-md rounded-3xl p-5 sm:p-6 my-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-semibold">
            {editingAppointmentId
              ? "Редагування запису"
              : "Новий запис"}
          </h2>

          <button
            onClick={() => setIsModalOpen(false)}
            className="text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            name="client"
            value={newAppointment.client}
            onChange={handleChange}
            placeholder="Ім’я клієнта"
            className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
          />

          <select
            name="service"
            value={newAppointment.service}
            onChange={handleChange}
            className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
          >
            <option value="">Оберіть послугу</option>

            {availableServices.map((service) => (
              <option
                key={service.id}
                value={service.title}
              >
                {service.title}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3 bg-[#f7f3f1] p-4 rounded-2xl">
            <span className="text-[#7c5569]">
              Тривалість:
            </span>

            <input
              type="number"
              min="5"
              step="5"
              name="duration"
              value={newAppointment.duration}
              onChange={handleChange}
              className="w-24 bg-white p-2 rounded-xl outline-none"
            />

            <span className="text-[#7c5569]">
              хв
            </span>
          </div>

          <div className="flex items-center gap-3 bg-[#f7f3f1] p-4 rounded-2xl">
            <span className="text-[#7c5569]">
              Ціна:
            </span>

            <input
              type="number"
              name="price"
              value={newAppointment.price}
              onChange={handleChange}
              className="w-28 bg-white p-2 rounded-xl outline-none"
            />

            <span className="text-[#7c5569]">
              грн
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="startTime"
              value={newAppointment.startTime}
              onChange={handleChange}
              className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
            >
              <option value="">Початок</option>

              {availableTimeSlots.map((time) => (
                <option
                  key={time}
                  value={time}
                >
                  {time}
                </option>
              ))}
            </select>

            <div className="bg-[#f7f3f1] p-4 rounded-2xl text-[#7c5569]">
              Завершення:{" "}
              {newAppointment.endTime || "--:--"}
            </div>
          </div>

          <input
            type="text"
            name="phone"
            value={newAppointment.phone}
            onChange={handleChange}
            placeholder="Телефон"
            className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
          />

          <select
            name="status"
            value={newAppointment.status}
            onChange={handleChange}
            className="bg-[#f7f3f1] p-4 rounded-2xl outline-none"
          >
            <option value="confirmed">
              Підтверджено
            </option>

            <option value="pending">
              Очікується
            </option>

            <option value="completed">
              Завершено
            </option>
          </select>

          <textarea
            name="comment"
            value={newAppointment.comment}
            onChange={handleChange}
            placeholder="Коментар"
            rows={4}
            className="bg-[#f7f3f1] p-4 rounded-2xl outline-none resize-none"
          />

          {editingAppointmentId && (
            <button
              onClick={() =>
                handleDeleteAppointment(
                  editingAppointmentId
                )
              }
              className="bg-red-100 text-red-500 py-4 rounded-2xl hover:bg-red-200 transition"
            >
              Видалити запис
            </button>
          )}

          <button
            onClick={handleAddAppointment}
            className="bg-[#7c5569] text-white py-4 rounded-2xl hover:opacity-90 transition"
          >
            {editingAppointmentId
              ? "Зберегти зміни"
              : "Зберегти"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentModal;