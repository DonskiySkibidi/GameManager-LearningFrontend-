import { useNavigate } from "react-router";
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
import Gin from "/Gin.png";

import {
  getPropsStyle,
  updateGame,
  archiveGame,
  deleteGame,
} from "@entities/game/lib";
import { useStats } from "@entities/game/model";
import { useGlobalGameDispatch } from "@shared/lib/usageContext";
const { inputProps, colStyle } = getPropsStyle();

export function GameCard(props) {
  const { currentGame } = props;
  const navigate = useNavigate();
  const { id } = currentGame;
  const dispatch = useGlobalGameDispatch();
  const {
    startStars,
    setStartStars,
    gameStatus,
    setGameStatus,
    hoursPlayed,
    setHoursPlayed,
  } = useStats(currentGame);

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
          await deleteGame(currentGame, dispatch, navigate);
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
            await archiveGame(currentGame, dispatch, navigate);
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

                await updateGame(id, updatedGame, dispatch);
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
