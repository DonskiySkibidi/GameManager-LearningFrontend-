import { updateGameById } from "@shared/api";

export async function archiveGame(currentGame, dispatch, navigate) {
  try {
    await updateGameById(currentGame.id, {
      ...currentGame,
      status: "archived",
    });
    dispatch({
      type: "updateGame",
      payload: { ...currentGame, status: "archived" },
      how: "archived",
    });
    navigate("/backlog");
  } catch (error) {
    console.log(`Произошла ошибка при архивировании ${error}`);
  }
}
