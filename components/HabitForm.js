import { useState } from "react";

export default function HabitForm({ addHabit }) {
  const [habit, setHabit] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (habit.trim()) {
      addHabit(habit);
      setHabit("");
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Add a new habit here..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
