import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingAppointmentId, setEditingAppointmentId] = useState(null);

  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");

    return savedAppointments
      ? JSON.parse(savedAppointments)
      : [
          {
            id: 1,
            client: "Анна Коваль",
            service: "Манікюр",
            time: "12:00 - 13:30",
            status: "confirmed",
            phone: "+380991112233",
            comment: "Френч дизайн",
            date: "2026-05-26",
          },

          {
            id: 2,
            client: "Софія Мельник",
            service: "Брови",
            time: "15:00 - 16:00",
            status: "pending",
            phone: "+380671234567",
            comment: "",
            date: "2026-05-26",
          },

          {
            id: 3,
            client: "Ірина Савчук",
            service: "Макіяж",
            time: "18:00 - 19:30",
            status: "completed",
            phone: "+380931111111",
            comment: "Весільний макіяж",
            date: "2026-05-27",
          },
        ];
  });

  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem("services");

    return savedServices
      ? JSON.parse(savedServices)
      : [
          {
            id: 1,
            title: "Манікюр",
            duration: 120,
            price: 1200,
            category: "nails",
          },
          {
            id: 2,
            title: "Манікюр + дизайн",
            duration: 150,
            price: 1500,
            category: "nails",
          },
          {
            id: 3,
            title: "Педикюр",
            duration: 90,
            price: 1000,
            category: "nails",
          },
        ];
  });
  const [newService, setNewService] = useState({
    title: "",
    duration: 60,
    price: 0,
  });

  const [editingServiceId, setEditingServiceId] = useState(null);
  const masterProfile = JSON.parse(localStorage.getItem("masterProfile")) || {
    category: "nails",
    workingHours: {
      start: "09:00",
      end: "20:00",
    },
  };

  const [customSchedule, setCustomSchedule] = useState(() => {
    const saved = localStorage.getItem("customSchedule");
    return saved ? JSON.parse(saved) : {};
  });

  const [customStart, setCustomStart] = useState("09:00");
  const [customEnd, setCustomEnd] = useState("20:00");
  const [unavailableDates, setUnavailableDates] = useState(["2026-05-29"]);
  const [newAppointment, setNewAppointment] = useState({
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
  const availableServices = services.filter(
    (service) => service.category === masterProfile.category
  );
  const formattedDate = selectedDate.toLocaleDateString("sv-SE");
  const currentSchedule = customSchedule[formattedDate] || {
    start: masterProfile.workingHours.start,
    end: masterProfile.workingHours.end,
  };
  const availableTimeSlots = [];

  const startHour = Number(currentSchedule.start.split(":")[0]);

  const endHour = Number(currentSchedule.end.split(":")[0]);

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 5) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(
        2,
        "0"
      )}`;

      let isBusy = false;

      for (const appointment of appointments) {
        if (appointment.date !== selectedDate.toLocaleDateString("sv-SE")) {
          continue;
        }

        if (editingAppointmentId && appointment.id === editingAppointmentId) {
          continue;
        }

        const existingStart = appointment.time.split(" - ")[0];

        const existingEnd = appointment.time.split(" - ")[1];

        const [newH, newM] = time.split(":").map(Number);

        const newStart = newH * 60 + newM;

        const newEnd = newStart + (newAppointment.duration || 0);

        const [existingH1, existingM1] = existingStart.split(":").map(Number);

        const [existingH2, existingM2] = existingEnd.split(":").map(Number);

        const existingStartMinutes = existingH1 * 60 + existingM1;

        const existingEndMinutes = existingH2 * 60 + existingM2;

        if (newStart < existingEndMinutes && newEnd > existingStartMinutes) {
          isBusy = true;
          break;
        }
      }

      if (!isBusy) {
        if (newAppointment.duration > 0) {
          const [h, m] = time.split(":").map(Number);

          const totalMinutes = h * 60 + m + newAppointment.duration;
          const workEnd =
            Number(currentSchedule.end.split(":")[0]) * 60 +
            Number(currentSchedule.end.split(":")[1]);

          if (totalMinutes <= workEnd) {
            availableTimeSlots.push(time);
          }
        } else {
          availableTimeSlots.push(time);
        }
      }
    }
  }

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === formattedDate
  );
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);
  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    // вибір послуги

    if (name === "service") {
      const selectedService = services.find(
        (service) => service.title === value
      );

      const duration = selectedService?.duration || 0;
      const price = selectedService?.price || 0;

      let calculatedEndTime = "";

      if (newAppointment.startTime && duration > 0) {
        const [hours, minutes] = newAppointment.startTime
          .split(":")
          .map(Number);

        const totalMinutes = hours * 60 + minutes + duration;

        const endHours = Math.floor(totalMinutes / 60)
          .toString()
          .padStart(2, "0");

        const endMinutes = (totalMinutes % 60).toString().padStart(2, "0");

        calculatedEndTime = `${endHours}:${endMinutes}`;
      }

      setNewAppointment({
        ...newAppointment,
        service: value,
        duration,
        price,
        endTime: calculatedEndTime,
      });

      return;
    }
    if (name === "duration") {
      const duration = Number(value);

      let calculatedEndTime = "";

      if (newAppointment.startTime) {
        const [hours, minutes] = newAppointment.startTime
          .split(":")
          .map(Number);

        const totalMinutes = hours * 60 + minutes + duration;

        const endHours = Math.floor(totalMinutes / 60)
          .toString()
          .padStart(2, "0");

        const endMinutes = (totalMinutes % 60).toString().padStart(2, "0");

        calculatedEndTime = `${endHours}:${endMinutes}`;
      }

      setNewAppointment({
        ...newAppointment,
        duration,
        endTime: calculatedEndTime,
      });

      return;
    }
    // вибір часу початку
    if (name === "startTime") {
      let calculatedEndTime = "";

      if (newAppointment.duration > 0) {
        const [hours, minutes] = value.split(":").map(Number);

        const totalMinutes = hours * 60 + minutes + newAppointment.duration;

        const endHours = Math.floor(totalMinutes / 60)
          .toString()
          .padStart(2, "0");

        const endMinutes = (totalMinutes % 60).toString().padStart(2, "0");

        calculatedEndTime = `${endHours}:${endMinutes}`;
      }

      setNewAppointment({
        ...newAppointment,
        startTime: value,
        endTime: calculatedEndTime,
      });

      return;
    }

    setNewAppointment({
      ...newAppointment,
      [name]: value,
    });
  };
  const saveDaySchedule = () => {
    const formatted = selectedDate.toLocaleDateString("sv-SE");

    setCustomSchedule({
      ...customSchedule,
      [formatted]: {
        start: customStart,
        end: customEnd,
      },
    });
  };
  const getDayStatus = (date) => {
    const formatted = date.toLocaleDateString("sv-SE");
    if (unavailableDates.includes(formatted)) {
      return "day-off";
    }
    const dayAppointments = appointments.filter(
      (appointment) => appointment.date === formatted
    );

    // повністю зайнято
    if (dayAppointments.length >= 5) {
      return "full";
    }

    // є записи
    if (dayAppointments.length > 0) {
      return "partial";
    }

    // робочий день
    return "working";
  };
  const handleEditAppointment = (appointment) => {
    setEditingAppointmentId(appointment.id);

    setNewAppointment({
      client: appointment.client,
      service: appointment.service,
      duration: appointment.duration || 0,
      price: appointment.price || 0,
      startTime: appointment.time.split(" - ")[0],
      endTime: appointment.time.split(" - ")[1],
      status: appointment.status,
      phone: appointment.phone || "",
      comment: appointment.comment || "",
    });

    setIsModalOpen(true);
  };

  const handleAddAppointment = () => {
    if (unavailableDates.includes(formattedDate) && !editingAppointmentId) {
      return;
    }

    if (newAppointment.endTime <= newAppointment.startTime) {
      alert("Час завершення має бути пізніше за час початку");

      return;
    }

    if (newAppointment.endTime > currentSchedule.end) {
      alert(`Робочий день закінчується о ${masterProfile.workingHours.end}`);

      return;
    }

    const appointment = {
      id: editingAppointmentId || Date.now(),

      client: newAppointment.client,

      service: newAppointment.service,

      price: Number(newAppointment.price || 0),

      duration: Number(newAppointment.duration || 0),

      startTime: newAppointment.startTime,

      endTime: newAppointment.endTime,

      time: `${newAppointment.startTime} - ${newAppointment.endTime}`,

      status: newAppointment.status,

      phone: newAppointment.phone,

      comment: newAppointment.comment,

      date: formattedDate,
    };

    const hasConflict = appointments.some((appointment) => {
      // свій запис при редагуванні пропускаємо
      if (appointment.id === editingAppointmentId) {
        return false;
      }

      // тільки цей день
      if (appointment.date !== formattedDate) {
        return false;
      }

      const existingStart = appointment.time.split(" - ")[0];

      const existingEnd = appointment.time.split(" - ")[1];

      return (
        newAppointment.startTime < existingEnd &&
        newAppointment.endTime > existingStart
      );
    });

    if (hasConflict) {
      alert("На цей час вже існує запис");

      return;
    }

    if (editingAppointmentId) {
      setAppointments(
        appointments.map((item) =>
          item.id === editingAppointmentId ? appointment : item
        )
      );
    } else {
      setAppointments([...appointments, appointment]);
    }

    setIsModalOpen(false);

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
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );

    setIsModalOpen(false);

    setEditingAppointmentId(null);
  };
  const toggleDayOff = () => {
    const formatted = selectedDate.toLocaleDateString("sv-SE");

    if (unavailableDates.includes(formatted)) {
      setUnavailableDates(
        unavailableDates.filter((date) => date !== formatted)
      );
    } else {
      setUnavailableDates([...unavailableDates, formatted]);
    }
  };
  const handleAddService = () => {
    if (!newService.title) return;

    if (editingServiceId) {
      setServices(
        services.map((service) =>
          service.id === editingServiceId
            ? {
                ...service,
                title: newService.title,
                duration: Number(newService.duration),
                price: Number(newService.price),
              }
            : service
        )
      );

      setEditingServiceId(null);
    } else {
      setServices([
        ...services,
        {
          id: Date.now(),
          title: newService.title,
          duration: Number(newService.duration),
          price: Number(newService.price),
          category: masterProfile.category,
        },
      ]);
    }

    setNewService({
      title: "",
      duration: 60,
      price: 0,
    });
  };
  const handleEditService = (service) => {
    setEditingServiceId(service.id);

    setNewService({
      title: service.title,
      duration: service.duration,
      price: service.price,
    });
  };
  const handleDeleteService = (id) => {
    setServices(services.filter((service) => service.id !== id));

    if (editingServiceId === id) {
      setEditingServiceId(null);

      setNewService({
        title: "",
        duration: 60,
        price: 0,
      });
    }
  };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
      {/* Calendar */}
      <div className="bg-white rounded-3xl p-6 shadow-sm h-fit">
        <h2 className="text-2xl font-semibold text-[#2c2226]">Календар</h2>

        <p className="text-[#9a8f94] mt-1">Ваші записи та вільні дні</p>
        <div className="mt-4 bg-[#f7f3f1] p-4 rounded-2xl">
          <div className="font-semibold mb-3">Графік для обраного дня</div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <input
                type="time"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="bg-white p-2 rounded-xl"
              />

              <span>—</span>

              <input
                type="time"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="bg-white p-2 rounded-xl"
              />
            </div>

            <button
              onClick={saveDaySchedule}
              className="bg-[#7c5569] text-white py-2 rounded-xl hover:opacity-90"
            >
              Зберегти
            </button>
          </div>

          {customSchedule[formattedDate] && (
            <div className="mt-3 text-sm text-[#7c5569]">
              Для цього дня: {customSchedule[formattedDate].start}
              {" - "}
              {customSchedule[formattedDate].end}
            </div>
          )}
        </div>

        <div className="mt-8 leya-calendar">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date, view }) => {
              if (view !== "month") return;

              const status = getDayStatus(date);

              if (status === "working") {
                return "working-day";
              }

              if (status === "day-off") {
                return "day-off";
              }

              if (status === "partial") {
                return "partial-day";
              }

              if (status === "full") {
                return "full-day";
              }
            }}
          />
        </div>
      </div>

      {/* Appointments */}
      <div className="bg-white rounded-3xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Записи на день</h2>

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
            <div
              key={appointment.id}
              onClick={() => handleEditAppointment(appointment)}
              className="flex items-center justify-between p-5 bg-[#f7f3f1] rounded-3xl cursor-pointer hover:bg-[#efe8e5] transition"
            >
              <div>
                <h3 className="font-semibold">{appointment.client}</h3>

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
                {appointment.status === "confirmed" && "Підтверджено"}
                {appointment.status === "pending" && "Очікується"}
                {appointment.status === "completed" && "Завершено"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-start sm:items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 sm:p-6 my-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-semibold">
                {editingAppointmentId ? "Редагування запису" : "Новий запис"}
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
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-3 bg-[#f7f3f1] p-4 rounded-2xl">
                <span className="text-[#7c5569]">Тривалість:</span>

                <input
                  type="number"
                  min="5"
                  step="5"
                  name="duration"
                  value={newAppointment.duration}
                  onChange={handleChange}
                  className="w-24 bg-white p-2 rounded-xl outline-none"
                />

                <span className="text-[#7c5569]">хв</span>
              </div>
              <div className="flex items-center gap-3 bg-[#f7f3f1] p-4 rounded-2xl">
                <span className="text-[#7c5569]">Ціна:</span>

                <input
                  type="number"
                  name="price"
                  value={newAppointment.price}
                  onChange={handleChange}
                  className="w-28 bg-white p-2 rounded-xl outline-none"
                />

                <span className="text-[#7c5569]">грн</span>
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
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>

                <div className="bg-[#f7f3f1] p-4 rounded-2xl text-[#7c5569]">
                  Завершення: {newAppointment.endTime || "--:--"}
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
                <option value="confirmed">Підтверджено</option>

                <option value="pending">Очікується</option>

                <option value="completed">Завершено</option>
              </select>

              <textarea
                name="comment"
                value={newAppointment.comment}
                onChange={handleChange}
                placeholder="Коментар"
                rows="4"
                className="bg-[#f7f3f1] p-4 rounded-2xl outline-none resize-none"
              />
              {editingAppointmentId && (
                <button
                  onClick={() => handleDeleteAppointment(editingAppointmentId)}
                  className="bg-red-100 text-red-500 py-4 rounded-2xl hover:bg-red-200 transition"
                >
                  Видалити запис
                </button>
              )}
              <button
                onClick={handleAddAppointment}
                className="bg-[#7c5569] text-white py-4 rounded-2xl hover:opacity-90 transition"
              >
                {editingAppointmentId ? "Зберегти зміни" : "Зберегти"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPage;
