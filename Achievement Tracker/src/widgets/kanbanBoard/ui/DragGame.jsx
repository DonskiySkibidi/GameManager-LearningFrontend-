import { useSortable } from "@dnd-kit/react/sortable";
import { Card, Select } from "antd";
import Gin from "/Gin.png";
import { useIsSmall } from "@shared/hooks";

const statusOptions = [
  { value: "backlog", label: "Бэклог" },
  { value: "playing", label: "Играю" },
  { value: "completed", label: "Пройдено" },
  { value: "dropped", label: "Бросил" },
];

export function DragGame(props) {
  const isSmall = useIsSmall();

  const { game, index, column } = props;
  const id = game.id;
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });
  return (
    <Card
      title={game.title}
      style={{ marginBottom: "20px", cursor: "pointer" }}
      size="small"
      styles={{ root: { maxWidth: "250px" } }}
      ref={ref}
      data-dragging={isDragging}
      cover={
        <img
          style={{ borderRadius: "0" }}
          src={game.imageUrl === "" ? Gin : game.imageURL}
          alt="gamePhoto"
        ></img>
      }
    >
      {isSmall && (
        <Select
          style={{ width: "100%" }}
          options={statusOptions}
          value={column}
          onChange={async (value) => {
            try {
              const { updateGameById, dispatch } = props;
              const updatedGame = { ...game, status: value };
              await updateGameById(game.id, updatedGame);
              dispatch({
                type: "updateGame",
                payload: updatedGame,
                how: "board",
                newStatus: value,
              });
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Выбор
        </Select>
      )}
    </Card>
  );
}
