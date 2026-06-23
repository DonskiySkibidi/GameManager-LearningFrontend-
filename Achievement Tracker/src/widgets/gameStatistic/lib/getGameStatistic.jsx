export function getGameStatistic(games) {
  const totalGames = games.length;
  const stats = games.reduce(
    (acc, game) => {
      acc.totalHours += game.hoursPlayed;
      if (game.status === "playing") acc.playing++;
      if (game.status === "completed") acc.completed++;
      if (game.status === "dropped") acc.dropped++;
      if (game.status === "backlog") acc.backlog++;
      if (game.status === "archived") acc.archived++;
      return acc;
    },
    {
      totalHours: 0,
      playing: 0,
      completed: 0,
      dropped: 0,
      backlog: 0,
      archived: 0,
    },
  );
  return {
    totalGames: totalGames,
    stats: stats,
  };
}
