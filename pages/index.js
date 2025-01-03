import HabitForm from "@/components/HabitForm";
import HabitList from "@/components/HabitList";

import { useState } from "react";

export default function Home() {
  const [habits, setHabits] = useState([]);

  function handleAddHabit(habit) {
    setHabits((prevHabits) => [
      ...prevHabits,
      { id: prevHabits.length, habit, checked: false },
    ]);
  }

  function handleToggleHabit(index) {
    setHabits((prevHabits) => {
      const updatedHabits = [...prevHabits];
      updatedHabits[index].checked = !updatedHabits[index].checked;
      return updatedHabits;
    });
  }
  return (
    <div>
      <h1>Welcome to the Habit Tracker!</h1>
      <HabitForm addHabit={handleAddHabit} />
      <HabitList habits={habits} onToggleHabit={handleToggleHabit} />
    </div>
  );
}
