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
      setError("Please select at least one day or choose 'Every day'");
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
      <FormContentWrapper>
        <StyledInput
          type="text"
          value={habit}
          onChange={(e) => setHabit(e.target.value)}
          placeholder="Add a new habit..."
          required
        />
        <h2>How often:</h2>
        <StyledButton
          type="button"
          onClick={() => setEveryday(!everyday)}
          selected={everyday}
        >
          Every day
        </StyledButton>
        {!everyday && (
          <DaysContainer>
            {daysOfWeek.map((day) => (
              <StyledButton
                key={day}
                type="button"
                onClick={() => handleDayChange(day)}
                selected={days.includes(day)}
              >
                {day}
              </StyledButton>
            ))}
          </DaysContainer>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}{" "}
        {/* Fehlermeldung anzeigen */}
        <button type="submit">Add Habit</button>
      </FormContentWrapper>
    </form>
  );
}

const StyledInput = styled.input`
  padding: 12px;
  margin: 14px;
  border-radius: 5px;
  border: solid, 1px #ccc;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  margin-left: 14px;
  border-radius: 5px;
  background-color: ${(props) => (props.selected ? "#8AAAA5" : "#0000")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: 1px solid ${(props) => (props.selected ? "#8AAAA5" : "#ccc")};
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
`;

const DaysContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Stellt sicher, dass die Buttons am Anfang ausgerichtet sind */
  flex-wrap: wrap; /* Ermöglicht das Umbrechen der Buttons, wenn sie den Container überschreiten */
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const FormContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
