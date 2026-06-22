import { Card, Button } from "antd";
import Log from "./Log";
import { deleteLogsLocalStorage } from "../helpers/logsFunctions";
import { useState } from "react";

export default function Logs({ logs, dispatch }) {
  const isEmpty = logs.length === 0;
  const [visibleCount, setVisibleCount] = useState(5);

  const localLogs = logs.slice(0, visibleCount);

  return (
    <>
      <Card
        style={{
          maxHeight: "35vh",
          overflowY: "scroll",
          scrollbarWidth: "thin",
          marginBottom: "20px",
        }}
      >
        {!isEmpty ? (
          <>
            {localLogs.map((e) => {
              return <Log key={e.id} log={e} />;
            })}
            {visibleCount < logs.length && (
              <Button onClick={() => setVisibleCount((prev) => prev + 5)}>
                Загрузить ещё
              </Button>
            )}
          </>
        ) : (
          <div>Логи пустые</div>
        )}
      </Card>
      <Button
        type="primary"
        danger={true}
        onClick={() => {
          deleteLogsLocalStorage();
          dispatch({
            type: "clearLogs",
          });
        }}
      >
        Очистить логи
      </Button>
    </>
  );
}
