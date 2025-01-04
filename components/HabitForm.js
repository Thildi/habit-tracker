import { useState } from "react";
import styled from "styled-components";

export default function HabitForm({ onAddHabit }) {
  const [habit, setHabit] = useState("");
  const [days, setDays] = useState([]);
  const [everyday, setEveryday] = useState(false);
  const [error, setError] = useState("");

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (everyday || days.length > 0) {
      if (habit.trim()) {
        const selectedDays = everyday ? daysOfWeek : days;
        onAddHabit(habit, selectedDays);
        setHabit("");
        setDays([]);
        setEveryday(false);
        setError("");
      }
    } else {
      setError("Please select at least one day or choose 'Everyday'");
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
      <StyledInput
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Add a new habit..."
        required
      />
      <div>
        <label>
          <StyledInput
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
              <StyledInput
                type="checkbox"
                checked={days.includes(day)} // Überprüft, ob der Tag ausgewählt wurde
                onChange={() => handleDayChange(day)} // Fügt den Tag hinzu oder entfernt ihn
              />
              {day}
            </label>
          ))}
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Fehlermeldung anzeigen */}
      <button type="submit">Add Habit</button>
    </form>
  );
}

const StyledInput = styled.input`
  padding: 10px;
  margin: 14px;
  border-radius: 20px;
`;

const StyledCheckbox = styled.input;
