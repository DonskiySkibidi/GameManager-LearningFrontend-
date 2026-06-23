import { Card, Button } from "antd";
import { Log } from "@entities/log/ui/Log";
import { deleteLogsLocalStorage } from "@shared/lib/localStorage";
import { useGlobalGameDispatch } from "@shared/lib/usageContext";
import { useVisibleCount } from "@entities/log/model";

export function Logs({ logs }) {
  const isEmpty = logs.length === 0;
  const { visibleCount, setVisibleCount } = useVisibleCount();

  const localLogs = logs.slice(0, visibleCount);
  const dispatch = useGlobalGameDispatch();

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
