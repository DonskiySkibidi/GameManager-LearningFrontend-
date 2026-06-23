import { Select } from "antd";

export function SelectSort({ sortType, setSortType }) {
  return (
    <Select
      style={{ width: "100%" }}
      value={sortType}
      onChange={(value) => setSortType(value)}
      options={[
        { label: "По названию (А-Я)", value: "nameSort" },
        { label: "Сначала высокий рейтинг", value: "ratingSort" },
        { label: "Сначала долгие (часы)", value: "hoursSort" },
      ]}
    />
  );
}
