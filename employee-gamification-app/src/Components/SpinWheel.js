import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../Styles/SpinWheel.css";
import { useNavigate } from "react-router-dom";

const WheelContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 10px solid #333;
  overflow: hidden;
`;

const Wheel = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: ${({ rotation }) => `rotate(${rotation}deg)`};
  transition: transform 4s ease-out;
`;

const Segment = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  background-color: ${({ color }) => color};
  transform-origin: 100% 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%);
  ${({ rotation }) => `transform: rotate(${rotation}deg)`};
`;

const Arrow = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid red;
  z-index: 1;
`;

const SpinButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  cursor: pointer;
  font-size: 24px;
`;

const PrizeDisplay = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-size: 16px;
  font-weight: bold;
  color: green;
`;

const TotalAmount = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-size: 16px;
  font-weight: bold;
  color: blue;
`;

const SpinCountDisplay = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  font-size: 16px;
  font-weight: bold;
  color: red;
`;

const segments = [
  { color: "lightcoral", label: "Delicious - free", amount: 0 },
  { color: "lightblue", label: "Skillful - free", amount: 0 },
  { color: "lightgreen", label: "Expensive - comp", amount: 100 },
  { color: "yellow", label: "Good - super", amount: 50 },
  { color: "cyan", label: "Good - comp", amount: 20 },
  { color: "purple", label: "Bad - super", amount: 0 },
  { color: "pink", label: "Bad - comp", amount: 0 },
  { color: "orange", label: "Slow - free", amount: 0 },
  { color: "lightyellow", label: "Interesting - super", amount: 30 },
  { color: "lightgray", label: "Interesting - comp", amount: 10 },
  { color: "lightpink", label: "Cheap - super", amount: 25 },
  { color: "red", label: "Cheap - comp", amount: 5 },
  { color: "magenta", label: "Exciting - super", amount: 75 },
  { color: "lime", label: "Comfortable - free", amount: 0 },
  { color: "aqua", label: "Exotic - free", amount: 0 },
  { color: "gold", label: "Exotic - comp", amount: 150 },
];

const SpinWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [currentPrize, setCurrentPrize] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [quizzesCompleted, setQuizzesCompleted] = useState(false);

  useEffect(() => {
    const storedSpinCount = localStorage.getItem("spin_count");
    const storedTotalAmount = localStorage.getItem("total_amount");
    const allSpinsUsed = localStorage.getItem("all_spins_used");
    const storedQuizzesCompleted = localStorage.getItem("quizzes_completed");

    if (storedTotalAmount) {
      setTotalAmount(Number(storedTotalAmount));
    }

    if (allSpinsUsed) {
      setSpinCount(0);
    } else if (storedSpinCount) {
      setSpinCount(Number(storedSpinCount));
    } else {
      setSpinCount(0); // Initial spin count if none is stored
    }

    if (storedQuizzesCompleted === "true") {
      setQuizzesCompleted(true);
    }
  }, []);

  const spin = () => {
    if (spinCount <= 0) {
      alert("No more spins remaining!");
      return;
    }

    const newRotation = rotation + Math.floor(5000 + Math.random() * 5000);
    setRotation(newRotation);

    // Calculate prize based on the final rotation
    const segmentAngle = 360 / segments.length;
    const index = Math.floor((newRotation % 360) / segmentAngle);
    const selectedSegment = segments[index];
    setCurrentPrize(selectedSegment.label);
    const newTotalAmount = totalAmount + selectedSegment.amount;
    setTotalAmount(newTotalAmount);
    localStorage.setItem("total_amount", newTotalAmount);

    const newSpinCount = spinCount - 1;
    setSpinCount(newSpinCount);
    localStorage.setItem("spin_count", newSpinCount);
    if (newSpinCount <= 0) {
      localStorage.setItem("all_spins_used", "true");
    }
  };
  const navigate = useNavigate();
  if (!quizzesCompleted) {
    return (
      <div>
        <p>Please complete all quizzes first!</p>
        <button onClick={() => navigate("/scoreboard")}>
          Go to Scoreboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="spin-card">
        <WheelContainer>
          <Arrow />
          <SpinButton onClick={spin}>🔄</SpinButton>
          <Wheel rotation={rotation}>
            {segments.map((segment, index) => (
              <Segment
                key={index}
                color={segment.color}
                rotation={(360 / segments.length) * index}
              />
            ))}
          </Wheel>
        </WheelContainer>
      </div>
      {currentPrize && (
        <PrizeDisplay>
          {segments.find((seg) => seg.label === currentPrize).amount > 0 ? (
            <>
              You won: {currentPrize} ($
              {segments.find((seg) => seg.label === currentPrize).amount})
            </>
          ) : (
            <>Better luck next time!</>
          )}
        </PrizeDisplay>
      )}
      <TotalAmount>Total Collected: ${totalAmount}</TotalAmount>
      <SpinCountDisplay>Spins remaining: {spinCount}</SpinCountDisplay>
    </div>
  );
};

export default SpinWheel;
