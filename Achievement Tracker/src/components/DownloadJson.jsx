import { useGameContext } from "../context/GameContext";
import { Button} from "antd";


export default function DownloadJson() {
  const { items, activityLog, theme } = useGameContext();

  const backupData = {
    games: items,
    logs: activityLog,
    theme: theme,
  };

  const jsonString = JSON.stringify(backupData, null, 2);
  return <Button onClick={()=>{
    const blob = new Blob([jsonString],{ type: "application/json" })
    const downloadUrl = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = downloadUrl;
    link.download = "backup_games.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link)
    URL.revokeObjectURL(downloadUrl

    )
  }}>Сохранить бэкап</Button>;
}
