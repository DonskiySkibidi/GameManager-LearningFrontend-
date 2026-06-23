import { GameList } from "@widgets/gameList";
import { Row, Col, Typography } from "antd";
import { useArchivedGame } from "@pages/Archive/lib";

export function Archive() {
  const archivedGames = useArchivedGame();
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
