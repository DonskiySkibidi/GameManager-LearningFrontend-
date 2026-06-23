import { Grid } from "antd";

const { useBreakpoint } = Grid;

export function useIsSmall() {
  const screens = useBreakpoint();
  return !screens.md;
}
