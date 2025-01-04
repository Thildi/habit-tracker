import HabitForm from "@/components/HabitForm";
import HabitList from "@/components/HabitList";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(savedHabits);
  }, []);

  // Funktion zum Hinzufügen eines Habits
  function handleAddHabit(habit, days) {
    const newHabit = {
      id: uuidv4(),
      habit,
      days: days || [],
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

  function handleClearProgress() {
    const resetHabits = habits.map((habit) => ({
      ...habit,
      progress: Object.keys(habit.progress).reduce((acc, day) => {
        acc[day] = false;
        return acc;
      }, {}),
    }));
    setHabits(resetHabits);

    localStorage.setItem("habits", JSON.stringify(resetHabits));
  }

  return (
    <div>
      <h1>Welcome to TrackTastic!</h1>
      <HabitForm onAddHabit={handleAddHabit} />

      <HabitList
        habits={habits}
        onToggleHabit={handleToggleHabit}
        onDeleteHabit={handleDeleteHabit}
      />
      <button onClick={handleClearProgress}>Clear Progress</button>
    </div>
  );
}
