import { useNavigate } from "react-router";
import { useGameDispatch } from "../context/GameContext";
import { useState } from "react";
import { updateGameById, deleteGameById } from "../shared/api/gamesApi";
import {
  Row,
  Col,
  Flex,
  Typography,
  Image,
  Select,
  InputNumber,
  Button,
  Rate,
  Popconfirm,
  Card,
  Tooltip,
} from "antd";
import Gin from "../../public/Gin.png";

const inputProps = {
  mode: "spinner",
  min: 0,
  max: 5000,
  style: { width: 150 },
};
const colStyle = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 12,
};
export default function GameCard({ currentGame }) {
  const dispatch = useGameDispatch();
  const navigate = useNavigate();
  const { id } = currentGame;
  const [startStars, setStartStars] = useState(currentGame.rating);
  const [gameStatus, setGameStatus] = useState(currentGame.status);
  const [hoursPlayed, setHoursPlayed] = useState(currentGame.hoursPlayed);
  if (!currentGame) {
    return <div>Загрузка...</div>;
  }
  return (
    <>
      <Button
        type="primary"
        style={{ margin: "0px 10px 10px 0" }}
        onClick={() => navigate("/backlog")}
      >
        Назад
      </Button>
      <Popconfirm
        title="Удалить игру"
        description="Вы действительно хотите удалить игру из списка"
        okText="Да"
        cancelText="Отмена"
        onConfirm={async () => {
          const id = currentGame.id;
          await deleteGameById(id);
          dispatch({
            type: "deleteGame",
            deleteGameId: currentGame.id,
            gameTitle: currentGame.title,
          });
          navigate("/backlog");
        }}
      >
        <Button
          style={{ margin: "0px 10px 10px 0" }}
          type="primary"
          danger={true}
        >
          Удалить
        </Button>
      </Popconfirm>
      <Tooltip
        title={
          currentGame.status === "dropped" || currentGame.status === "completed"
            ? "В архив"
            : "Архивировать можно только пройденные или заброшенные игры!"
        }
      >
        <Button
          type="primary"
          style={{ margin: "0px 10px 10px 0" }}
          // styles={{root: {backgroundColor: "#ff7f00"}}}
          onClick={async () => {
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
          }}
          disabled={
            currentGame.status !== "dropped" &&
            currentGame.status !== "completed"
          }
        >
          В архив
        </Button>
      </Tooltip>
      <Row gutter={[16, 16]} align={"middle"} style={{ textAlign: "center" }}>
        <Col {...colStyle}>
          <Image alt="gamePicture" src={currentGame.imageUrl || Gin}></Image>
        </Col>
        <Col {...colStyle}>
          <Flex align="center" justify="center" vertical gap={15}>
            <Typography.Title level={1}>{currentGame.title}</Typography.Title>
            <Card>
              <Typography>Платформа: {currentGame.platform}</Typography>
            </Card>
            <Card>
              <Typography>Жанр: {currentGame.genre}</Typography>
            </Card>

            <Card>
              <Flex gap={15} align="center">
                <Typography>Количество часов:</Typography>
                <InputNumber
                  defaultValue={currentGame.hoursPlayed}
                  value={hoursPlayed}
                  {...inputProps}
                  onChange={(val) => {
                    setHoursPlayed(val);
                  }}
                ></InputNumber>
              </Flex>
            </Card>

            <Select
              value={gameStatus}
              onChange={(val) => {
                setGameStatus(val);
              }}
              style={{ width: "200px" }}
              options={[
                { label: "Не открывал", value: "backlog" },
                { label: "Играю", value: "playing" },
                { label: "Завершил", value: "completed" },
                { label: "Забросил", value: "dropped" },
              ]}
            />
            <Flex gap={15}>
              <Typography>Оценка:</Typography>
              <Rate
                allowHalf
                defaultValue={startStars}
                value={startStars}
                onChange={(val) => {
                  setStartStars(val);
                }}
              ></Rate>
            </Flex>
            <Button
              type="primary"
              onClick={async () => {
                const updatedGame = {
                  ...currentGame,
                  rating: startStars,
                  status: gameStatus,
                  hoursPlayed: hoursPlayed,
                };
                await updateGameById(id, updatedGame);
                dispatch({
                  type: "updateGame",
                  payload: updatedGame,
                  how: "update",
                });
              }}
            >
              Сохранить изменения
            </Button>
          </Flex>
        </Col>
      </Row>
    </>
  );
}
