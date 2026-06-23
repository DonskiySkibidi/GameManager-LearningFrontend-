import { Layout, Menu, Skeleton, FloatButton } from "antd";
import { Outlet } from "react-router";
import { useState } from "react";
import { useGlobalGame, useGlobalGameDispatch } from "@shared/lib/usageContext";
import { getMenuItems } from "@widgets/layout/lib";

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

const { Sider, Content } = Layout;
const items = getMenuItems();

export function AppLayout() {
  const { isLoading, theme } = useGlobalGame();
  const dispatch = useGlobalGameDispatch();
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
