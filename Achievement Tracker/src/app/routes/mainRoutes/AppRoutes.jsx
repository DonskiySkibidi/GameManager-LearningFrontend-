import { Route, Routes } from "react-router";

import {
  Archive,
  Backlog,
  BoardPage,
  Dashboard,
  GameDetails,
  Settings,
} from "@pages";

import { AppLayout } from "@widgets/layout";
import { ConfigProvider, theme } from "antd";

import { useGameContext } from "@app/store";

export function AppRoutes() {
  const { theme: AppTheme } = useGameContext();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          AppTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#722ed1",
          borderRadius: 8,
        },
      }}
    >
      <Routes>
        <Route element={<AppLayout></AppLayout>}>
          <Route path="/" element={<Dashboard></Dashboard>} />
          <Route path="/backlog" element={<Backlog></Backlog>} />
          <Route
            path="/GameDetails/:id"
            element={<GameDetails></GameDetails>}
          />
          <Route path="/board" element={<BoardPage></BoardPage>} />
          <Route path="/archive" element={<Archive></Archive>} />
          <Route path="/settings" element={<Settings></Settings>} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default AppRoutes;
