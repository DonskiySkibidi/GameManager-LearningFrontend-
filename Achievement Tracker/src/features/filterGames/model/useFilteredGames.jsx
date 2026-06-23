import { useGlobalGame } from "@shared/lib/usageContext";

export function useFilteredGames(searchQuery, platform) {
  const { items: games } = useGlobalGame();

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPlatform = platform === "none" || game.platform === platform;
    const matchesStatus = game.status !== "archived";
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  return { filteredGames };
}
