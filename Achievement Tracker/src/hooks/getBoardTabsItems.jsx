import DragGamesColumn from "../components/DragGamesColumn";
import DragGame from "../components/DragGame";

export function getBoardTabsItems(items, dispatch, updateGameById) {
  const arr = Object.entries(items).map(([column, columnGames]) => {
    return {
      label: column,
      key: column,
      children: (
        <DragGamesColumn id={column}>
          {columnGames.map((item, index) => (
            <DragGame
              dispatch={dispatch}
              updateGameById={updateGameById}
              game={item}
              key={item.id}
              index={index}
              column={column}
            />
          ))}
        </DragGamesColumn>
      ),
    };
  });
  return arr;
}
