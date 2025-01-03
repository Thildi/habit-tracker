import { useState } from "react";

export default function HabitForm({ addHabit }) {
  const [habit, setHabit] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (habit.trim()) {
      addHabit(habit);
      setHabit("");
    }
  };
  return (
    <form>
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
