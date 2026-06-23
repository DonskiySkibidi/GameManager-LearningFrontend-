import { createNewGame } from "@shared/api";

export async function addGame(values, dispatch) {
  const dataObj = {
    ...values,
    rating: 0,
    review: "",
    imageUrl: "",
    hoursPlayed: 0,
    status: "backlog",
  };

  const data = await createNewGame(dataObj);
  dispatch({
    type: "addGame",
    payload: data,
  });
}
