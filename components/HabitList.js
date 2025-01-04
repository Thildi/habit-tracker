import styled from "styled-components";
import ReactConfetti from "react-confetti";
import { useState, useEffect } from "react";

export default function HabitList({ habits, onToggleHabit, onDeleteHabit }) {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0); // Initialisiere mit 0
  const [windowHeight, setWindowHeight] = useState(0); // Initialisiere mit 0

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // useEffect, um den Zugriff auf window im Client auszuführen
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    if (typeof window !== "undefined") {
      // Setze die initialen Werte nur im Browser
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []); // Der Effekt wird nur einmal nach dem ersten Rendern ausgeführt

  const handleCheckboxChange = (habitIndex, day) => {
    const updatedHabits = [...habits]; // Kopiere die Habits
    updatedHabits[habitIndex].progress[day] =
      !updatedHabits[habitIndex].progress[day]; // Toggle den Fortschritt für den jeweiligen Tag
    onToggleHabit(updatedHabits); // Gebe die geänderten Habits zurück
  };

  // Prüft, ob alle Habits abgeschlossen sind
  const checkIfAllCompleted = (habit) => {
    return habit.days.every((day) => habit.progress[day] === true);
  };

  // Trigger Confetti, wenn alle Habits abgeschlossen sind und es Habits gibt
  useEffect(() => {
    if (habits.length > 0) {
      const allHabitsCompleted = habits.every((habit) =>
        checkIfAllCompleted(habit)
      );

      if (allHabitsCompleted) {
        setIsConfettiActive(true);
        setTimeout(() => setIsConfettiActive(false), 4000); // Konfetti für 3 Sekunden anzeigen
      }
    }
  }, [habits]); // Wird jedes Mal ausgelöst, wenn `habits` aktualisiert wird

  return (
    <div>
      {isConfettiActive && windowWidth && windowHeight && (
        <ReactConfetti
          width={windowWidth}
          height={windowHeight}
          numberOfPieces={300} // Du kannst die Anzahl der Konfetti-Stücke anpassen
        />
      )}
      <TableHeadline>Your Habits:</TableHeadline>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Habit</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, habitIndex) => (
            <tr key={habit.id}>
              <td>
                <StyledDeleteButton onClick={() => onDeleteHabit(habit.id)}>
                  &times;
                </StyledDeleteButton>
              </td>
              <td>{habit.habit}</td>
              {daysOfWeek.map((day) => (
                <td key={day}>
                  {habit.days && habit.days.includes(day) && (
                    <StyledCheckbox
                      type="checkbox"
                      checked={habit.progress[day] || false}
                      onChange={() => handleCheckboxChange(habitIndex, day)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const StyledDeleteButton = styled.button`
  border: none;
  background: none;
  color: #c30e59;
  margin: 0.1px;
  padding: 0.1px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;

const StyledCheckbox = styled.input`
  border-radius: 20px;
  ${(props) =>
    props.type === "checkbox" &&
    `
    margin: 5px;
    padding: 5px;
  `}
`;

const TableHeadline = styled.h2`
  margin: 16px;
`;
