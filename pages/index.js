import HabitForm from "@/components/HabitForm";
import HabitList from "@/components/HabitList";
import { useState, useEffect } from "react";

export default function Home() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(savedHabits);
  }, []);

  // Funktion zum Hinzufügen eines Habits
  function handleAddHabit(habit, days) {
    const newHabit = {
      id: Date.now(),
      habit,
      days,
      progress: {},
    };

    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);

    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  }

  // Funktion zum Toggle der Checkbox für ein Habit an einem bestimmten Tag
  function handleToggleHabit(updatedHabits) {
    setHabits(updatedHabits); // Zustand der Habits aktualisieren
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  }

  function handleDeleteHabit(habitId) {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    setHabits(updatedHabits);

    localStorage.setItem("habits", JSON.stringify(updatedHabits));
  }

  return (
    <div>
      <h1>Welcome to the Habit Tracker!</h1>
      <HabitForm onAddHabit={handleAddHabit} />
      <HabitList
        habits={habits}
        onToggleHabit={handleToggleHabit}
        onDeleteHabit={handleDeleteHabit}
      />
    </div>
  );
}
