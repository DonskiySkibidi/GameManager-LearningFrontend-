import { Select } from "antd";

export function SelectPlatform({ platform, setPlatform }) {
  return (
    <Select
      style={{ width: "100%" }}
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
  );
}
