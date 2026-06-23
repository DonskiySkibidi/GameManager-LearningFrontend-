function validateGame(game) {
  const allowedPlatforms = ["PC", "PS5", "XboxSeriesX", "NintendoSwitch"];
  const allowedStatuses = [
    "backlog",
    "playing",
    "completed",
    "dropped",
    "archived",
  ];

  return (
    typeof game.title === "string" &&
    game.title.trim() !== "" &&
    typeof game.genre === "string" &&
    allowedPlatforms.includes(game.platform) &&
    typeof game.rating === "number" &&
    game.rating >= 0 &&
    game.rating <= 5 &&
    typeof game.review === "string" &&
    typeof game.hoursPlayed === "number" &&
    allowedStatuses.includes(game.status)
  );
}

function validateLog(log) {
  return (
    typeof log.date === "string" &&
    typeof log.gameId === "string" &&
    typeof log.gameTitle === "string" &&
    typeof log.type === "string"
  );
}

export function validateBackupStructure(data) {
  try {
    if (!data || typeof data !== "object" || Array.isArray(data)) return false;

    if (
      !Object.hasOwn(data, "theme") ||
      !Object.hasOwn(data, "games") ||
      !Object.hasOwn(data, "logs")
    ) {
      return false;
    }

    if (data.theme !== "dark" && data.theme !== "light") return false;

    if (!Array.isArray(data.games) || !data.games.every(validateGame))
      return false;

    if (!Array.isArray(data.logs) || !data.logs.every(validateLog))
      return false;

    data.games.forEach((g) => (g.id = crypto.randomUUID()));
    data.logs.forEach((l) => (l.id = crypto.randomUUID()));

    return true;
  } catch (e) {
    console.error("Validation error:", e);
    return false;
  }
}
