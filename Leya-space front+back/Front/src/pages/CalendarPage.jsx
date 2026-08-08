import { useState } from "react";

import CalendarSidebar from "../components/calendar/CalendarSidebar";
import AppointmentList from "../components/calendar/AppointmentList";
import AppointmentModal from "../components/calendar/AppointmentModal";
import ServicesManager from "../components/calendar/ServicesManager";

import useAppointments from "../hooks/useAppointments";

function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);

  const masterProfile =
    JSON.parse(localStorage.getItem("masterProfile")) || {
      category: "nails",
      workingHours: {
        start: "09:00",
        end: "20:00",
      },
    };

  const {
    services,
    newAppointment,
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

    setNewAppointment,
    setNewService,

    setEditingAppointmentId,

    setCustomStart,
    setCustomEnd,

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
  } = useAppointments(
    selectedDate,
    masterProfile
  );

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">

      <CalendarSidebar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        customStart={customStart}
        setCustomStart={setCustomStart}
        customEnd={customEnd}
        setCustomEnd={setCustomEnd}
        saveDaySchedule={saveDaySchedule}
        customSchedule={customSchedule}
        formattedDate={formattedDate}
        getDayStatus={getDayStatus}
      />

      <div className="flex flex-col gap-6">

        <AppointmentList
          selectedDate={selectedDate}
          formattedDate={formattedDate}
          unavailableDates={unavailableDates}
          filteredAppointments={filteredAppointments}
          setIsModalOpen={setIsModalOpen}
          setEditingAppointmentId={setEditingAppointmentId}
          setNewAppointment={setNewAppointment}
          toggleDayOff={toggleDayOff}
          handleEditAppointment={(appointment) => {
            handleEditAppointment(appointment);
            setIsModalOpen(true);
          }}
        />

        <ServicesManager
          services={services}
          masterProfile={masterProfile}
          newService={newService}
          setNewService={setNewService}
          editingServiceId={editingServiceId}
          handleAddService={handleAddService}
          handleEditService={handleEditService}
          handleDeleteService={handleDeleteService}
        />

      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        editingAppointmentId={editingAppointmentId}
        setIsModalOpen={setIsModalOpen}
        newAppointment={newAppointment}
        handleChange={handleChange}
        availableServices={availableServices}
        availableTimeSlots={availableTimeSlots}
        handleDeleteAppointment={handleDeleteAppointment}
        handleAddAppointment={() => {
          handleAddAppointment();
          setIsModalOpen(false);
        }}
      />

    </div>
  );
}

export default CalendarPage;