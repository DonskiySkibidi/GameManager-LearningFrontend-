import { Statistic, Row, Col, Card } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { getGameStatistic } from "../hooks/getGameStatistic";
import Logs from "./Logs";
const colStyle = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 8,
  xxl: 6,
};
export default function GameStatistic({ games, logs, dispatch }) {
  const { totalGames, stats } = getGameStatistic(games);

  return (
    <Row gutter={[20, 20]}>
      <Col {...colStyle}>
        <Card>
          <Statistic
            title="Количество игр"
            suffix="шт."
            value={totalGames}
          ></Statistic>
        </Card>
      </Col>
      <Col {...colStyle}>
        <Card>
          <Statistic
            title="Всего часов в играх"
            suffix="часов"
            value={stats.totalHours}
          ></Statistic>
        </Card>
      </Col>
      <Col {...colStyle}>
        <Card>
          <Statistic title="Пройдено игр" value={stats.completed}></Statistic>
        </Card>
      </Col>
      <Col {...colStyle}>
        <Card>
          <Statistic title="Активных игр" value={stats.playing}></Statistic>
        </Card>
      </Col>
      <Col {...colStyle}>
        <Card>
          <Statistic title="Заброшенных игр" value={stats.dropped}></Statistic>
        </Card>
      </Col>
      <Col {...colStyle}>
        <Card>
          <Statistic title="Не открытых игр" value={stats.backlog}></Statistic>
        </Card>
      </Col>
      <Col {...colStyle}>
        <Card>
          <Statistic title="В архиве" value={stats.archived}></Statistic>
        </Card>
      </Col>
      <Col {...colStyle}>
        <Card>
          <Statistic
            title="Процент пройденных игр"
            value={
              stats.completedGames === 0
                ? 0
                : ((stats.completed / totalGames) * 100).toFixed(2)
            }
            styles={{ content: { color: "#3f8600" } }}
            suffix="%"
            prefix={<ArrowUpOutlined />}
          ></Statistic>
        </Card>
      </Col>
      <Col {...colStyle}>
        <Card>
          <Statistic
            title="Процент заброшенных"
            prefix={<ArrowDownOutlined />}
            styles={{ content: { color: "#cf1322" } }}
            suffix="%"
            value={
              stats.droppedGames === 0
                ? 0
                : ((stats.dropped / totalGames) * 100).toFixed(2)
            }
          ></Statistic>
        </Card>
      </Col>
      <Col span={24}>
        <Logs logs={logs} dispatch={dispatch} />
      </Col>
    </Row>
  );
}
