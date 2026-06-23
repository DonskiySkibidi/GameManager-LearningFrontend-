import {
  AppstoreOutlined,
  HomeOutlined,
  InboxOutlined,
  ProjectOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router";

export function getMenuItems() {
  const items = [
    {
      key: "Dashboard",
      icon: <HomeOutlined />,
      label: (
        <NavLink
          to={`/`}
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      ),
    },
    {
      key: "Backlog",
      icon: <AppstoreOutlined />,
      label: (
        <NavLink
          to={`/backlog`}
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Backlog
        </NavLink>
      ),
    },
    {
      key: "Board",
      icon: <ProjectOutlined />,
      label: (
        <NavLink
          to={`/board`}
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Board
        </NavLink>
      ),
    },
    {
      key: "Archive",
      icon: <InboxOutlined />,
      label: (
        <NavLink
          to={`/archive`}
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Archive
        </NavLink>
      ),
    },
    {
      key: "Setting",
      icon: <SettingOutlined />,
      label: (
        <NavLink
          to={`/settings`}
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Settings
        </NavLink>
      ),
    },
  ];

  return items;
}
