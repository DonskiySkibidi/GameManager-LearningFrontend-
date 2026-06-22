import GameCard from "../../components/GameCard";
import { useParams } from "react-router";
import { useGameContext } from "../../context/GameContext";
import { Result, Button } from "antd";
import { Link } from "react-router";
export default function GameDetails() {
  const { id } = useParams();
  const { items: games } = useGameContext();

  const currentGame = games.find((game) => game.id === id);
  if (!currentGame) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Упс! Такой игры в твоем бэклоге нет."
        extra={
          <Link to="/backlog">
            <Button type="primary">Вернуться в бэклог</Button>
          </Link>
        }
      />
    );
  }

  return <GameCard key={id} currentGame={currentGame} />;
}
