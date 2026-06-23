import { useState } from "react";

export function useStats(currentGame) {
  const [startStars, setStartStars] = useState(currentGame.rating);
  const [gameStatus, setGameStatus] = useState(currentGame.status);
  const [hoursPlayed, setHoursPlayed] = useState(currentGame.hoursPlayed);
  return {
    startStars: startStars,
    setStartStars: setStartStars,
    gameStatus: gameStatus,
    setGameStatus: setGameStatus,
    hoursPlayed: hoursPlayed,
    setHoursPlayed: setHoursPlayed,
  };
}
