import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";
import { Typography } from "antd";

export function DragGamesColumn({ children, id, theme }) {
  const { isDropTarget, ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
    collisionPriority: CollisionPriority.Low,
  });

  const bgColors =
    theme === "dark"
      ? { dropTarget: "#3b3b3b", default: "#262626", color: "#fff" }
      : {
          dropTarget: "#b3b3b3",
          default: "#e7e7e7",
          color: "#010101",
        };
  return (
    <div
      ref={ref}
      style={{
        backgroundColor: isDropTarget ? bgColors.dropTarget : bgColors.default,
        padding: "16px",
        minHeight: "500px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <Typography.Title
        level={4}
        style={{
          textTransform: "capitalize",
          margin: 0,
          color: bgColors.color,
        }}
      >
        {id}
      </Typography.Title>
      {children}
    </div>
  );
}
