import { useEffect, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import './cooldowns.css'
const Countdown = (props: number) => {
  const calculateTimeLeft = () => {
    return props - Math.floor(Date.now() / 1000);
  };
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      if(timeLeft <= 0)
      {
        clearTimeout(timer);
      }
    }, 1000);

   
  });

  if (timeLeft > 0) {
    return <div>{timeLeft}</div>;
  } else {
    return <div>Ready</div>;
  }
};
const Cooldowns = () => {
  //get summoner cooldown
  // cooldown - block.timeStamp

  const teamOneCooldowns = useAppSelector((state) => {
    return [...state.battle.teamOne.map((t) => t.cooldown)];
  });

  const teamTwoCooldowns = useAppSelector((state) => {
    return [...state.battle.teamTwo.map((t) => t.cooldown)];
  });

  return (
    <div className='cooldowns-container'>
      <div className='team-one-cooldowns'>{teamOneCooldowns.map((t) => Countdown(t))}</div>
      <div className='team-two-cooldowns'>{teamTwoCooldowns.map((t) => Countdown(t))}</div>
    </div>
  );
};

export default Cooldowns;
