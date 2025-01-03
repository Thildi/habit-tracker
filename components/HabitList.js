export default function HabitList({ habits }) {
  return (
    <div>
      <h2>Your Habits:</h2>
      <ul>
        {habits.map((habit, index) => (
          <li key={index}>{habit}</li>
        ))}
      </ul>
    </div>
  );
}
