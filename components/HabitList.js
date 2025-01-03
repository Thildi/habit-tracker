export default function HabitList({ habits, onToggleHabit }) {
  return (
    <div>
      <h2>Your Habits:</h2>
      <ul>
        {habits.map((habit, index) => (
          <li key={index}>
            <input
              type="checkbox"
              value={habit}
              onChange={() => onToggleHabit(index)}
            />
            {habit.habit}
          </li>
        ))}
      </ul>
    </div>
  );
}
