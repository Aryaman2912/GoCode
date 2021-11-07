import React, { useEffect, useState } from "react";

export default function ContestTimer({ contest }) {
  const calculateTimeLeft = () => {
    console.log(contest);
    let year = new Date().getFullYear();
    let contest_closing_time = new Date(contest.Date);
    let intdur = parseFloat(contest.Duration);
    contest_closing_time.setHours(contest_closing_time.getHours() + intdur);
    contest_closing_time.setMinutes(
      contest_closing_time.getMinutes() + 60 * (intdur % 1)
    );
    let difference = +new Date(contest_closing_time) - +new Date();
    console.log(`The difference is ${difference}`);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  const contestStyle = {
    color: "white",
  };
  return (
    <div>
      <p style={contestStyle}>
        Time left:
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </p>
    </div>
  );
}
