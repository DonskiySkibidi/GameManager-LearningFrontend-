import { useState } from "react";
import { useGameContext } from "../context/GameContext";
export function useFilteredGames() {
  const { items: games } = useGameContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [platform, setPlatform] = useState("none");
  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPlatform = platform === "none" || game.platform === platform;
    const matchesStatus = game.status !== "archived";
    return matchesSearch && matchesPlatform && matchesStatus;
  });
  return {
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    platform: platform,
    setPlatform: setPlatform,
    filteredGames: filteredGames,
  };
}
