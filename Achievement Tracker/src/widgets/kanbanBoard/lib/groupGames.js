export function groupGamesByStatus(games) {
  return games.reduce(
    (acc, curr) => {
      if (curr.status === "backlog") acc.backlog.push(curr);
      if (curr.status === "playing") acc.playing.push(curr);
      if (curr.status === "completed") acc.completed.push(curr);
      if (curr.status === "dropped") acc.dropped.push(curr);
      return acc;
    },
    { backlog: [], playing: [], completed: [], dropped: [] },
  );
}
