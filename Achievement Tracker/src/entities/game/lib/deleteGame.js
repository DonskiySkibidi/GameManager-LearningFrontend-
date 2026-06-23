import { deleteGameById } from "@shared/api";

export async function deleteGame(currentGame, dispatch, navigate) {
  try {
    const id = currentGame.id;
    await deleteGameById(id);
    dispatch({
      type: "deleteGame",
      deleteGameId: currentGame.id,
      gameTitle: currentGame.title,
    });
    navigate("/backlog");
  } catch (error) {
    console.error(error);
  }
}
