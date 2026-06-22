import { useGameContext, useGameDispatch } from "../../context/GameContext";
import GameStatistic from "../../components/GameStatistic";
export default function Dashboard() {
  const { items: games, activityLog: logs } = useGameContext();
  const dispatch = useGameDispatch();
  return (
    <GameStatistic
      games={games}
      logs={logs}
      dispatch={dispatch}
    ></GameStatistic>
  );
}
