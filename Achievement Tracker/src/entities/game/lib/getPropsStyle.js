export function getPropsStyle() {
  const inputProps = {
    mode: "spinner",
    min: 0,
    max: 5000,
    style: { width: 150 },
  };
  const colStyle = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 12,
    xl: 12,
  };
  return {
    inputProps: inputProps,
    colStyle: colStyle,
  };
}
