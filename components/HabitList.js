import styled from "styled-components";

export default function HabitList({ habits, onToggleHabit, onDeleteHabit }) {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleCheckboxChange = (habitIndex, day) => {
    const updatedHabits = [...habits]; // Kopiere die Habits
    updatedHabits[habitIndex].progress[day] =
      !updatedHabits[habitIndex].progress[day]; // Toggle den Fortschritt für den jeweiligen Tag
    onToggleHabit(updatedHabits); // Gebe die geänderten Habits zurück
  };

  return (
    <div>
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

  /* Spezifische Styles für Checkboxen */
  ${(props) =>
    props.type === "checkbox" &&
    `
    margin: 110px
    padding: 1px;
  `}
`;

const TableHeadline = styled.h2`
  margin: 16px;
`;
