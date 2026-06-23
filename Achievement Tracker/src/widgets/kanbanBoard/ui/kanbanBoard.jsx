import { Row, Col, Tabs } from "antd";
import { DragDropProvider } from "@dnd-kit/react";
import { DragGame } from "@widgets/kanbanBoard/ui/DragGame";
import { DragGamesColumn } from "@widgets/kanbanBoard/ui/DragGamesColumn";
import { useGlobalGame } from "@shared/lib/usageContext";
import { move } from "@dnd-kit/helpers";
import { useBoardItems, getBoardTabsItems } from "@widgets/kanbanBoard/model";
import { updateGameById } from "@shared/api";
import { useIsSmall } from "@shared/hooks";

export function Board() {
  const { items: games, theme } = useGlobalGame();
  const { items, setItems, dispatch } = useBoardItems();

  const isSmall = useIsSmall();

  if (isSmall) {
    const tabItems = getBoardTabsItems(items, dispatch, updateGameById, theme);

    return <Tabs items={tabItems} />;
  }

  return (
    <>
      <DragDropProvider
        onDragOver={(event) => {
          setItems((prevItems) => move(prevItems, event));
        }}
        onDragEnd={async (event) => {
          const { source } = event.operation;
          const gameId = source.id;

          const finalItems = move(items, event);
          setItems(finalItems);

          let newStatus = null;
          Object.entries(finalItems).forEach(([columnName, columnGames]) => {
            if (columnGames.some((g) => g.id === gameId)) {
              newStatus = columnName;
            }
          });
          const originalGame = games.find((g) => g.id === gameId);

          if (originalGame && originalGame.status !== newStatus) {
            const updatedGame = { ...originalGame, status: newStatus };

            try {
              await updateGameById(gameId, updatedGame);
              dispatch({
                type: "updateGame",
                payload: updatedGame,
                how: "board",
                newStatus: newStatus,
              });
            } catch (error) {
              console.error("Ошибка сохранения на сервере:", error);
            }
          }
        }}
      >
        {
          <Row gutter={[20, 20]}>
            {Object.entries(items).map(([column, columnGames]) => (
              <Col span={6} key={column}>
                <DragGamesColumn id={column} theme={theme}>
                  {columnGames.map((item, index) => (
                    <DragGame
                      game={item}
                      key={item.id}
                      index={index}
                      column={column}
                      dispatch={dispatch}
                      updateGameById={updateGameById}
                    />
                  ))}
                </DragGamesColumn>
              </Col>
            ))}
          </Row>
        }
      </DragDropProvider>
    </>
  );
}
