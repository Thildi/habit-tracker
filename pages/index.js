import HabitForm from "@/components/HabitForm";
import HabitList from "@/components/HabitList";
import { useState } from "react";

export default function Home() {
  const [habits, setHabits] = useState([]);

  // Funktion zum Hinzufügen eines Habits
  function handleAddHabit(habit, days) {
    setHabits((prevHabits) => [
      ...prevHabits,
      { id: prevHabits.length, habit, days, progress: {} },
    ]);
  }

  // Funktion zum Toggle der Checkbox für ein Habit an einem bestimmten Tag
  function handleToggleHabit(updatedHabits) {
    setHabits(updatedHabits); // Zustand der Habits aktualisieren
  }

  return (
    <div>
      <h1>Welcome to the Habit Tracker!</h1>
      <HabitForm onAddHabit={handleAddHabit} />
      <HabitList habits={habits} onToggleHabit={handleToggleHabit} />
    </div>
  );
}
