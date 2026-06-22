import { Row, Col, Tabs } from "antd";
import { DragDropProvider } from "@dnd-kit/react";
import DragGame from "../../components/DragGame";
import DragGamesColumn from "../../components/DragGamesColumn";
import { useGameContext } from "../../context/GameContext";
import { move } from "@dnd-kit/helpers";
import { updateGameById } from "../../shared/api/gamesApi";
import { useBoardItems } from "../../hooks/useBoardItems";
import { getBoardTabsItems } from "../../hooks/getBoardTabsItems";
import { useIsSmall } from "../../hooks/useIsSmall";

export default function Board() {
  const { items: games } = useGameContext();
  const { items, setItems, dispatch } = useBoardItems();

  const isSmall = useIsSmall();
  if (isSmall) {
    const tabItems = getBoardTabsItems(items, dispatch, updateGameById);

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
                <DragGamesColumn id={column}>
                  {columnGames.map((item, index) => (
                    <DragGame
                      game={item}
                      key={item.id}
                      index={index}
                      column={column}
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
