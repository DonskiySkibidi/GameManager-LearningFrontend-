import { Col, Row, Card, Tag, Empty } from "antd";
import { Link } from "react-router";
import Gin from "../../public/Gin.png";
const descColstyles = {
  xs: 24,
  sm: 12,
  md: 10,
  lg: 12,
};
export default function GameList({ gameArr }) {
  return (
    <Row gutter={[16, 16]}>
      {gameArr.length > 0 ? (
        gameArr.map((e) => {
          return (
            <Col xs={24} sm={12} md={8} lg={6} key={e.id}>
              <Link to={`/GameDetails/${e.id}`}>
                <Card
                  cover={
                    <img
                      style={{ borderRadius: "0" }}
                      src={e.imageUrl === "" ? Gin : e.imageURL}
                      alt="gamePhoto"
                    ></img>
                  }
                  title={e.title}
                  hoverable={true}
                >
                  <Row gutter={[16, 16]}>
                    <Col {...descColstyles}>
                      <Tag color={"yellow"}>Жанр {e.genre}</Tag>
                    </Col>
                    <Col span={24}>
                      <Tag color={"blue"}>Платформа: {e.platform}</Tag>
                    </Col>
                    <Col {...descColstyles}>
                      <Tag color={"red"}>Всего часов: {e.hoursPlayed}</Tag>
                    </Col>
                  </Row>
                </Card>
              </Link>
            </Col>
          );
        })
      ) : (
        <Empty description="Бэклог пуст"></Empty>
      )}
    </Row>
  );
}
