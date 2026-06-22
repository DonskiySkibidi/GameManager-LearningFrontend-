import "./App.css";
import GameProvider from "../context/GameProvider";

import AppRoutes from "./AppRoutes";

function App() {
  return (
    <GameProvider>
      <AppRoutes></AppRoutes>
    </GameProvider>
  );
}

export default App;
