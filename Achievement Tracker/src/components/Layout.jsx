import { Layout, Menu, Skeleton, FloatButton } from "antd";
import { Outlet } from "react-router";
import { NavLink } from "react-router";
import { useState } from "react";
import { useGameContext, useGameDispatch } from "../context/GameContext";
import {
  AppstoreOutlined,
  HomeOutlined,
  InboxOutlined,
  ProjectOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { MoonOutlined, SunOutlined } from "@ant-design/icons";
const menuStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

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
const { Sider, Content } = Layout;

export default function AppLayout() {
  const { isLoading, theme } = useGameContext();
  const dispatch = useGameDispatch();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
        width={!collapsed ? "200px" : "50px"}
        collapsible
        collapsed={collapsed}
        theme="light"
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          defaultSelectedKeys={["Dashboard"]}
          style={menuStyle}
          mode="inline"
          items={items}
          inlineCollapsed={collapsed}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: "24px", overflow: "initial" }}>
          {isLoading ? <Skeleton active /> : <Outlet />}
        </Content>
      </Layout>
      {theme === "dark" ? (
        <FloatButton
          icon={<SunOutlined />}
          onClick={() => {
            dispatch({
              type: "changeAlgorithm",
              payload: "light",
            });
          }}
        />
      ) : (
        <FloatButton
          icon={<MoonOutlined />}
          onClick={() => {
            dispatch({
              type: "changeAlgorithm",
              payload: "dark",
            });
          }}
        />
      )}
    </Layout>
  );
}
