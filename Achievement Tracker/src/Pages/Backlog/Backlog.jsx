import GameList from "../../components/GameList";
import AddGame from "../../components/AddGame";
import { Button, Input, Row, Col, Select } from "antd";
import { useState } from "react";
import { useFilteredGames } from "../../hooks/useFilteredGames";
const { Search } = Input;

const colStyle = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 4,
};

export default function Backlog() {
  const [modalOpen, setModalOpen] = useState(false);

  const [sortType, setSortType] = useState("nameSort");

  const { setSearchQuery, platform, setPlatform, filteredGames } =
    useFilteredGames();

  return (
    <Row gutter={[20, 20]}>
      <Col {...colStyle}>
        <Button onClick={() => setModalOpen(true)} type="primary">
          Добавить игру
        </Button>
      </Col>

      <Col {...colStyle}>
        <Search
          placeholder="Поиск игры"
          allowClear
          onSearch={(value) => setSearchQuery(value)}
          onChange={(e) => {
            if (e.target.value === "") setSearchQuery("");
          }}
          style={{ width: 220 }}
        />
      </Col>

      <Col {...colStyle}>
        <Select
          style={{ width: "100%" }}
          defaultValue="none"
          value={platform}
          onChange={(value) => setPlatform(value)}
          options={[
            { label: "Все платформы", value: "none" },
            { label: "ПК", value: "PC" },
            { label: "PS5", value: "PS5" },
            { label: "Xbox Series X", value: "XboxSeriesX" },
            { label: "Nintendo Switch", value: "NintendoSwitch" },
          ]}
        />
      </Col>
      <Col {...colStyle}>
        <Select
          style={{ width: "100%" }}
          defaultValue="nameSort"
          value={sortType}
          onChange={(value) => setSortType(value)}
          options={[
            { label: "По названию (А-Я)", value: "nameSort" },
            { label: "Сначала высокий рейтинг", value: "ratingSort" },
            { label: "Сначала долгие (часы)", value: "hoursSort" },
          ]}
        />
      </Col>

      {modalOpen && (
        <AddGame modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}

      <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
        <GameList
          gameArr={[...filteredGames].sort((a, b) => {
            switch (sortType) {
              case "nameSort": {
                return a.title.localeCompare(b.title);
              }
              case "ratingSort": {
                return b.rating - a.rating;
              }
              case "hoursSort": {
                return b.hoursPlayed - a.hoursPlayed;
              }
            }
          })}
        />
      </Col>
    </Row>
  );
}
