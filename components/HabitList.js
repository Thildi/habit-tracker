import styled from "styled-components";
import ReactConfetti from "react-confetti";
import { useState, useEffect } from "react";

export default function HabitList({ habits, onToggleHabit, onDeleteHabit }) {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const handleCheckboxChange = (habitIndex, day) => {
    const updatedHabits = [...habits];
    updatedHabits[habitIndex].progress[day] =
      !updatedHabits[habitIndex].progress[day];
    onToggleHabit(updatedHabits);
  };

  const checkIfAllCompleted = (habit) => {
    return habit.days.every((day) => habit.progress[day] === true);
  };

  useEffect(() => {
    if (habits.length > 0) {
      const allHabitsCompleted = habits.every((habit) =>
        checkIfAllCompleted(habit)
      );

      if (allHabitsCompleted) {
        setIsConfettiActive(true);
        setIsPopupOpen(true);
        setTimeout(() => {
          setIsConfettiActive(false);
        }, 5000);
      }
    }
  }, [habits]);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      {isConfettiActive && windowWidth && windowHeight && (
        <ReactConfetti
          width={windowWidth}
          height={windowHeight}
          numberOfPieces={500}
        />
      )}

      {isPopupOpen && (
        <Popup>
          <PopupContent>
            <h3>Congratulations!</h3>
            <p>You have completed all your habits!</p>
            <CloseButton onClick={closePopup}>Close</CloseButton>
          </PopupContent>
        </Popup>
      )}

      {habits.length === 0 ? (
        <AddHabitText>Add your first habit!</AddHabitText>
      ) : (
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
                        <CustomCheckbox
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
      )}
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

const TableHeadline = styled.h2`
  margin: 16px;
`;

const AddHabitText = styled.p`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-top: 20px;
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 300px;
`;

const CloseButton = styled.button`
  background-color: #c30e59;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #a72d4e;
  }
`;

const CheckboxContainer = styled.label`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const StyledCheckbox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  background: ${(props) => (props.checked ? "#C91959" : "white")};
  border: 2px solid ${(props) => (props.checked ? "#C91959" : "#ccc")};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #8aaaa5;
  }

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px rgba(138, 170, 165, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    display: ${(props) => (props.checked ? "block" : "none")};
    top: 0%.5;
    left: 4px;
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const CustomCheckbox = ({ checked, onChange }) => (
  <CheckboxContainer>
    <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
    <StyledCheckbox checked={checked} />
  </CheckboxContainer>
);
