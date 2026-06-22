export async function getAllGames() {
  try {
    const response = await fetch("http://localhost:3001/games", {
      method: "GET",
    });
    if (!response.ok) throw new Error("Fetch Load Error");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Сетевая ошибка:", error);
  }
}

export async function createNewGame(gameData) {
  try {
    const json = JSON.stringify(gameData);
    const response = await fetch("http://localhost:3001/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    });
    if (!response.ok) {
      console.error("Ошибка добавления, статус:", response.status);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Сетевая ошибка:", error);
  }
}

export async function deleteGameById(id) {
  const url = `http://localhost:3001/games/${id}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.error("Ошибка удаления, статус:", response.status);
    }
  } catch (error) {
    console.error("Сетевая ошибка:", error);
  }
}

export async function updateGameById(id, updatedData) {
  const url = `http://localhost:3001/games/${id}`;
  try {
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(updatedData),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function backupGames(newGames) {
  try {
    const oldGames = await getAllGames();

    await Promise.all(oldGames.map((game) => deleteGameById(game.id)));

    await Promise.all(newGames.map((game) => createNewGame(game)));
  } catch (error) {
    console.error("Ошибка при перезаписи базы данных:", error);
    throw error;
  }
}
