import { useState } from "react";
import { Button, Row, Col } from "antd";

import { AddGame } from "@features/addGame";
import { useFilteredGames } from "@features/filterGames";
import { SearchGame, SelectPlatform, SelectSort } from "@features/filterGames";
import { GameList } from "@widgets/gameList";
import { useModalOpen } from "@pages/Backlog/lib";

const colStyle = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 4,
};

export function Backlog() {
  const { modalOpen, setModalOpen } = useModalOpen();

  const [searchQuery, setSearchQuery] = useState("");
  const [platform, setPlatform] = useState("none");
  const [sortType, setSortType] = useState("nameSort");

  const { filteredGames } = useFilteredGames(searchQuery, platform);

  return (
    <Row gutter={[20, 20]}>
      <Col {...colStyle}>
        <Button onClick={() => setModalOpen(true)} type="primary">
          Добавить игру
        </Button>
      </Col>

      <Col {...colStyle}>
        <SearchGame searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Col>

      <Col {...colStyle}>
        <SelectPlatform platform={platform} setPlatform={setPlatform} />
      </Col>
      <Col {...colStyle}>
        <SelectSort sortType={sortType} setSortType={setSortType} />
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
