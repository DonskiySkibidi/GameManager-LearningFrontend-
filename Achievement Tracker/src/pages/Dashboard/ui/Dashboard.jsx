import { useGlobalGame } from "@shared/lib/usageContext";
import { GameStatistic } from "@widgets/gameStatistic";

export function Dashboard() {
  const { items: games, activityLog: logs } = useGlobalGame();
  return <GameStatistic games={games} logs={logs}></GameStatistic>;
}
