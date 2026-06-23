import { DragGame } from "../ui/DragGame";
import { DragGamesColumn } from "../ui/DragGamesColumn";
export function getBoardTabsItems(items, dispatch, updateGameById, theme) {
  const arr = Object.entries(items).map(([column, columnGames]) => {
    return {
      label: column,
      key: column,
      children: (
        <DragGamesColumn id={column} theme={theme}>
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
