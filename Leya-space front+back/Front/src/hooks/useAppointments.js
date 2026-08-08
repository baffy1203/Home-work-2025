import { useEffect, useState } from "react";
export default function useAppointments(
  selectedDate,
  masterProfile
) {
  const formattedDate =
    selectedDate.toLocaleDateString("sv-SE");
  const [appointments, setAppointments] =
    useState([]);
  const [services, setServices] = useState(() => {
    const saved =
      localStorage.getItem("services");
return saved
      ? JSON.parse(saved)
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
 const [editingAppointmentId,
    setEditingAppointmentId] =
    useState(null); const [editingServiceId,
    setEditingServiceId] =
    useState(null);  const [newService,
    setNewService] = useState({
    title: "",
    duration: 60,
    price: 0,
  });
const [newAppointment,
    setNewAppointment] = useState({
    client: "",service: "",duration: 0, price: 0,startTime: "",endTime: "", status: "pending",
 phone: "",
    comment: "",
  });

  const [customSchedule,
    setCustomSchedule] = useState(() => {
    const saved =
      localStorage.getItem("customSchedule");

    return saved
      ? JSON.parse(saved)
      : {};
  });
const [customStart,
    setCustomStart] =
    useState("09:00");
 const [customEnd,
    setCustomEnd] =
    useState("20:00");
const [unavailableDates,
    setUnavailableDates] =
    useState(["2026-05-29"]);

useEffect(() => {
  const savedAppointments = localStorage.getItem("appointments");

  setAppointments(
    savedAppointments ? JSON.parse(savedAppointments) : []
  );
}, []);

 useEffect(() => {
  localStorage.setItem(
    "appointments",
    JSON.stringify(appointments)
  );
}, [appointments]);

  const availableServices =
    services.filter(
      (service) =>
        service.category ===
        masterProfile.category
    );

  const currentSchedule =
    customSchedule[formattedDate] || {
      start:
        masterProfile.workingHours.start,
      end:
        masterProfile.workingHours.end,
    };

  const filteredAppointments =
    appointments.filter(
      (appointment) =>
        appointment.date === formattedDate
    );
      const availableTimeSlots = [];

  const startHour = Number(
    currentSchedule.start.split(":")[0]
  );

  const endHour = Number(
    currentSchedule.end.split(":")[0]
  );

  for (
    let hour = startHour;
    hour < endHour;
    hour++
  ) {
    for (
      let minute = 0;
      minute < 60;
      minute += 5
    ) {
      const time = `${String(hour).padStart(
        2,
        "0"
      )}:${String(minute).padStart(2, "0")}`;

      let isBusy = false;

      for (const appointment of appointments) {
        if (appointment.date !== formattedDate)
          continue;

        if (
          editingAppointmentId &&
          appointment.id ===
            editingAppointmentId
        )
          continue;

        const existingStart =
          appointment.time.split(" - ")[0];

        const existingEnd =
          appointment.time.split(" - ")[1];

        const [newH, newM] = time
          .split(":")
          .map(Number);

        const newStart =
          newH * 60 + newM;

        const newEnd =
          newStart +
          (newAppointment.duration || 0);

        const [h1, m1] =
          existingStart.split(":").map(Number);

        const [h2, m2] =
          existingEnd.split(":").map(Number);

        const existingStartMinutes =
          h1 * 60 + m1;

        const existingEndMinutes =
          h2 * 60 + m2;

        if (
          newStart < existingEndMinutes &&
          newEnd > existingStartMinutes
        ) {
          isBusy = true;
          break;
        }
      }

      if (!isBusy) {
        if (newAppointment.duration > 0) {
          const [h, m] = time
            .split(":")
            .map(Number);

          const totalMinutes =
            h * 60 +
            m +
            newAppointment.duration;

          const workEnd =
            Number(
              currentSchedule.end.split(":")[0]
            ) *
              60 +
            Number(
              currentSchedule.end.split(":")[1]
            );

          if (totalMinutes <= workEnd) {
            availableTimeSlots.push(time);
          }
        } else {
          availableTimeSlots.push(time);
        }
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "service") {
      const selectedService =
        services.find(
          (service) =>
            service.title === value
        );

      const duration =
        selectedService?.duration || 0;

      const price =
        selectedService?.price || 0;

      let calculatedEndTime = "";

      if (
        newAppointment.startTime &&
        duration > 0
      ) {
        const [hours, minutes] =
          newAppointment.startTime
            .split(":")
            .map(Number);

        const totalMinutes =
          hours * 60 +
          minutes +
          duration;

        calculatedEndTime = `${String(
          Math.floor(totalMinutes / 60)
        ).padStart(2, "0")}:${String(
          totalMinutes % 60
        ).padStart(2, "0")}`;
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
        const [hours, minutes] =
          newAppointment.startTime
            .split(":")
            .map(Number);

        const totalMinutes =
          hours * 60 +
          minutes +
          duration;

        calculatedEndTime = `${String(
          Math.floor(totalMinutes / 60)
        ).padStart(2, "0")}:${String(
          totalMinutes % 60
        ).padStart(2, "0")}`;
      }

      setNewAppointment({
        ...newAppointment,
        duration,
        endTime: calculatedEndTime,
      });

      return;
    }

    if (name === "startTime") {
      let calculatedEndTime = "";

      if (newAppointment.duration > 0) {
        const [hours, minutes] = value
          .split(":")
          .map(Number);

        const totalMinutes =
          hours * 60 +
          minutes +
          newAppointment.duration;

        calculatedEndTime = `${String(
          Math.floor(totalMinutes / 60)
        ).padStart(2, "0")}:${String(
          totalMinutes % 60
        ).padStart(2, "0")}`;
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
    setCustomSchedule({
      ...customSchedule,
      [formattedDate]: {
        start: customStart,
        end: customEnd,
      },
    });
  };

  const getDayStatus = (date) => {
    const formatted =
      date.toLocaleDateString("sv-SE");

    if (
      unavailableDates.includes(formatted)
    ) {
      return "day-off";
    }

    const dayAppointments =
      appointments.filter(
        (appointment) =>
          appointment.date === formatted
      );

    if (dayAppointments.length >= 5)
      return "full";

    if (dayAppointments.length > 0)
      return "partial";

    return "working";
  };

  const handleEditAppointment = (
    appointment
  ) => {
    setEditingAppointmentId(
      appointment.id
    );

    setNewAppointment({
      client: appointment.client,
      service: appointment.service,
      duration:
        appointment.duration || 0,
      price: appointment.price || 0,
      startTime:
        appointment.time.split(
          " - "
        )[0],
      endTime:
        appointment.time.split(
          " - "
        )[1],
      status: appointment.status,
      phone: appointment.phone || "",
      comment:
        appointment.comment || "",
    });
  };

  const handleDeleteAppointment = (
    id
  ) => {
    setAppointments(
      appointments.filter(
        (appointment) =>
          appointment.id !== id
      )
    );

    setEditingAppointmentId(null);
  };

  const handleAddAppointment = () => {
    const appointment = {
      id:
        editingAppointmentId ||
        Date.now(),

      client: newAppointment.client,

      service:
        newAppointment.service,

      price: Number(
        newAppointment.price || 0
      ),

      duration: Number(
        newAppointment.duration || 0
      ),

      startTime:
        newAppointment.startTime,

      endTime:
        newAppointment.endTime,

      time: `${newAppointment.startTime} - ${newAppointment.endTime}`,

      status:
        newAppointment.status,

      phone:
        newAppointment.phone,

      comment:
        newAppointment.comment,

      date: formattedDate,
    };

    if (editingAppointmentId) {
      setAppointments(
        appointments.map((item) =>
          item.id ===
          editingAppointmentId
            ? appointment
            : item
        )
      );
    } else {
      setAppointments([
        ...appointments,
        appointment,
      ]);
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
  };

  const toggleDayOff = () => {
    if (
      unavailableDates.includes(
        formattedDate
      )
    ) {
      setUnavailableDates(
        unavailableDates.filter(
          (date) =>
            date !== formattedDate
        )
      );
    } else {
      setUnavailableDates([
        ...unavailableDates,
        formattedDate,
      ]);
    }
  };

  const handleAddService = () => {
    if (!newService.title) return;

    if (editingServiceId) {
      setServices(
        services.map((service) =>
          service.id ===
          editingServiceId
            ? {
                ...service,
                title:
                  newService.title,
                duration: Number(
                  newService.duration
                ),
                price: Number(
                  newService.price
                ),
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
          title:
            newService.title,
          duration: Number(
            newService.duration
          ),
          price: Number(
            newService.price
          ),
          category:
            masterProfile.category,
        },
      ]);
    }

    setNewService({
      title: "",
      duration: 60,
      price: 0,
    });
  };

  const handleEditService = (
    service
  ) => {
    setEditingServiceId(service.id);

    setNewService({
      title: service.title,
      duration: service.duration,
      price: service.price,
    });
  };

  const handleDeleteService = (
    id
  ) => {
    setServices(
      services.filter(
        (service) =>
          service.id !== id
      )
    );

    if (editingServiceId === id) {
      setEditingServiceId(null);

      setNewService({
        title: "",
        duration: 60,
        price: 0,
      });
    }
  };

  return {
    appointments,services, newAppointment,
    newService,
    editingAppointmentId,
    editingServiceId,
    customStart,
    customEnd,
    customSchedule,
    unavailableDates,
    availableServices,
    availableTimeSlots,
    filteredAppointments,
    setAppointments,
    setServices,
    setNewAppointment,
    setNewService,
    setEditingAppointmentId,
    setEditingServiceId,
    setCustomStart,
    setCustomEnd,
    setUnavailableDates,
    handleChange,
    handleAddAppointment,
    handleDeleteAppointment,
    handleEditAppointment,
    handleAddService,
    handleEditService,
    handleDeleteService,
    toggleDayOff,
    saveDaySchedule,
    getDayStatus,
    formattedDate,
  };
}