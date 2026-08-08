import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarSidebar({
  selectedDate,
  setSelectedDate,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
  saveDaySchedule,
  customSchedule,
  formattedDate,
  getDayStatus,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm h-fit">
      <h2 className="text-2xl font-semibold text-[#2c2226]">
        Календар
      </h2>

      <p className="text-[#9a8f94] mt-1">
        Ваші записи та вільні дні
      </p>

      <div className="mt-4 bg-[#f7f3f1] p-4 rounded-2xl">
        <div className="font-semibold mb-3">
          Графік для обраного дня
        </div>

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
            Для цього дня:{" "}
            {customSchedule[formattedDate].start}
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

            if (status === "working") return "working-day";
            if (status === "day-off") return "day-off";
            if (status === "partial") return "partial-day";
            if (status === "full") return "full-day";
          }}
        />
      </div>
    </div>
  );
}

export default CalendarSidebar;