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
      <h2>Your Habits:</h2>
      <table>
        <thead>
          <tr>
            <th>Habit</th>
            {daysOfWeek.map((day) => (
              <th key={day}> {day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, habitIndex) => (
            <tr key={habit.id}>
              <td>
                <button onClick={() => onDeleteHabit(habit.id)}>&times;</button>
                {habit.habit}
              </td>
              {daysOfWeek.map((day) => (
                <td key={day}>
                  {habit.days && habit.days.includes(day) && (
                    <input
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
