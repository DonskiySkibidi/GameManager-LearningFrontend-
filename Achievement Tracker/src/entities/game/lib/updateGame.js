import { updateGameById } from "@shared/api";

export async function updateGame(id, updatedGame, dispatch) {
  try {
    await updateGameById(id, updatedGame);
    dispatch({
      type: "updateGame",
      payload: updatedGame,
      how: "update",
    });
  } catch (error) {
    console.error(error);
  }
}
