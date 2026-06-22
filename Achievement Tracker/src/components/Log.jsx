import { Card, Typography } from "antd";
import { getLogData } from "../hooks/getLogData";

export default function Log({ log }) {
  const data = getLogData(log);
  return (
    <Card style={{ marginBottom: "15px" }}>
      <Typography>{`${data.title} `}</Typography>
      <Typography>{`Дата ${data.date}`}</Typography>
    </Card>
  );
}
