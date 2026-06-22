import { useGameContext } from "../../context/GameContext";
import GameList from "../../components/GameList";
import { Row, Col, Typography } from "antd";

export default function Archive() {
  const { items: games } = useGameContext();
  const archivedGames = games.filter((game) => game.status === "archived");
  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <Typography style={{ marginLeft: "15px", fontSize: "2.5rem" }}>
          Архив
        </Typography>
      </Col>
      <Col span={24}>
        <GameList gameArr={archivedGames}></GameList>
      </Col>
    </Row>
  );
}
