import { Input } from "antd";
const { Search } = Input;


export function SearchGame({ searchQuery, setSearchQuery }) {
  return (
    <Search
      placeholder="Поиск игры"
      allowClear
      value={searchQuery}
      onSearch={(value) => setSearchQuery(value)}
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      style={{ width: 220 }}
    />
  );
}
