import { Button, Modal, Upload, message } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useGameDispatch } from "../context/GameContext";
import { backupGames } from "../shared/api/gamesApi";
import { validateBackupStructure } from "../helpers/validateBackup"; // Импортируем наш хелпер

export default function UploadJson() {
  const [modalOpen, setModalOpen] = useState(false);
  const [backup, setBackup] = useState(null);
  const [loading, setLoading] = useState(false); // Добавим лоадер для кнопки загрузки
  const dispatch = useGameDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const uploadProps = {
    name: "file",
    maxCount: 1,
    accept: ".json",
    beforeUpload: async (file) => {
      try {
        const text = await file.text();
        const parsedData = JSON.parse(text);

        // Передаем данные на растерзание нашему хелперу
        const isValid = validateBackupStructure(parsedData);

        if (!isValid) {
          messageApi.error(
            `Файл ${file.name} содержит некорректную структуру данных.`,
          );
          return Upload.LIST_IGNORE;
        }

        setBackup(parsedData);
        messageApi.success(`${file.name} успешно проверен и готов к загрузке!`);
      } catch (err) {
        messageApi.error(
          "Не удалось прочесть файл. Убедитесь, что это валидный JSON.",
        );
      }
      return false; // Отменяем стандартную отправку AntD на сервер
    },
    onRemove: () => setBackup(null),
  };

  const handleImport = async () => {
    try {
      setLoading(true);
      console.time("Backup Restoration");

      // Отправляем оптимизированные параллельные запросы на сервер
      await backupGames(backup.games);

      console.timeEnd("Backup Restoration");

      // Обновляем глобальный стейт приложения
      dispatch({
        type: "restoreBackup",
        payload: backup,
      });

      messageApi.success("Данные успешно восстановлены из бэкапа!");
      setModalOpen(false);
      setBackup(null);
    } catch (error) {
      messageApi.error("Произошла ошибка при сохранении данных на сервер.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Button onClick={() => setModalOpen(true)}>Загрузить бэкап</Button>
      <Modal
        title="Восстановление данных"
        open={modalOpen}
        onCancel={() => !loading && setModalOpen(false)}
        footer={[
          <Button
            key="back"
            disabled={loading}
            onClick={() => setModalOpen(false)}
          >
            Отменить
          </Button>,
          <Button
            type="primary"
            loading={loading}
            disabled={!backup}
            onClick={handleImport}
          >
            Загрузить
          </Button>,
        ]}
      >
        <div style={{ margin: "20px 0" }}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Выберите JSON файл бэкапа</Button>
          </Upload>
        </div>
      </Modal>
    </>
  );
}
