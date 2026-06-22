import "./App.css";
import { Route, Routes } from "react-router";
import AppLayout from "../components/Layout";
import Backlog from "../Pages/Backlog/Backlog";
import Dashboard from "../Pages/Dashboard/Dashboard";
import GameDetails from "../Pages/GameDetails/GameDetails";
import Board from "../Pages/Board/Board";
import Archive from "../Pages/Archive.jsx/Archive";
import Settings from "../Pages/Settings/Settings";
import { ConfigProvider, theme } from "antd";
import { useGameContext } from "../context/GameContext";
function AppRoutes() {
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
          <Route path="/board" element={<Board></Board>} />
          <Route path="/archive" element={<Archive></Archive>} />
          <Route path="/settings" element={<Settings></Settings>} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default AppRoutes;
