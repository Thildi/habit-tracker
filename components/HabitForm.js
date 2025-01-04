import { useState } from "react";

export default function HabitForm({ onAddHabit }) {
  const [habit, setHabit] = useState("");
  const [days, setDays] = useState([]);
  const [everyday, setEveryday] = useState(false);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (habit.trim()) {
      const selectedDays = everyday ? daysOfWeek : days;
      onAddHabit(habit, selectedDays);
      setHabit("");
      setDays([]);
      setEveryday(false);
    }
  };

  const handleDayChange = (day) => {
    setDays(
      (prevDays) =>
        prevDays.includes(day)
          ? prevDays.filter((d) => d !== day) // Entfernt den Tag, wenn er bereits ausgewählt ist
          : [...prevDays, day] // Fügt den Tag hinzu, wenn er noch nicht ausgewählt ist
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Add a new habit"
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={everyday}
            onChange={() => setEveryday(!everyday)}
          />
          Every day
        </label>
      </div>
      {!everyday && (
        <div>
          {daysOfWeek.map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                checked={days.includes(day)} // Überprüft, ob der Tag ausgewählt wurde
                onChange={() => handleDayChange(day)} // Fügt den Tag hinzu oder entfernt ihn
              />
              {day}
            </label>
          ))}
        </div>
      )}
      <button type="submit">Add Habit</button>
    </form>
  );
}
