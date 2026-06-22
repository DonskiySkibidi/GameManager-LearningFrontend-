export function getLogData(log) {
  const data = {
    title: "",
    date: log.date,
    type: log.type,
    gameID: log.gameID,
  };
  switch (log.type) {
    case "addGame": {
      data.title = `Добавлена игра ${log.gameTitle}`;
      break;
    }
    case "update": {
      data.title = `Игра ${log.gameTitle} обновлена`;
      break;
    }
    case "archived": {
      data.title = `Игра ${log.gameTitle} отправлена в архив`;
      break;
    }
    case "board": {
      data.title = `Игра ${log.gameTitle} перемещена в статус ${log.newStatus}`;
      break;
    }
    case "delete": {
      data.title = `Игра ${log.gameTitle} удалена`;
      break;
    }
  }
  return data;
}
