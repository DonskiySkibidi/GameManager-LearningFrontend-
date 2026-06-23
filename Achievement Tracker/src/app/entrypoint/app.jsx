import "../styles/App.css";
import { GameProvider } from "@app/providers";
import { AppRoutes } from "@app/routes";

function App() {
  return (
    <GameProvider>
      <AppRoutes></AppRoutes>
    </GameProvider>
  );
}

export default App;
