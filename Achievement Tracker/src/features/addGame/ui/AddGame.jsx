import { Form, Select, Modal, Input, Button, Space } from "antd";
import { useGlobalGameDispatch } from "@shared/lib/usageContext";
import { useWatch } from "antd/es/form/Form";

import { addGame } from "../lib/addGame";

export function AddGame(props) {
  const { modalOpen, setModalOpen } = props;
  const dispatch = useGlobalGameDispatch();
  const [form] = Form.useForm();
  const titleValue = useWatch("title", form);
  const genreValue = useWatch("genre", form);
  const platformValue = useWatch("platform", form);
  return (
    <>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Отменить
          </Button>,
        ]}
      >
        <h2 style={{ marginBottom: "10px" }}>Добавление новой игры</h2>
        <Form
          form={form}
          name="addGameForm"
          layout="vertical"
          onFinish={async (values) => {
            await addGame(values, dispatch);
            setModalOpen(false);
          }}
        >
          <Form.Item label="Название" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Жанр" name="genre" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="platform"
            label="Платформа"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "ПК", value: "PC" },
                { label: "PS5", value: "PS5" },
                { label: "Xbox Series X", value: "XboxSeriesX" },
                { label: "Nintendo Switch", value: "NintendoSwitch" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                disabled={
                  !titleValue?.trim() || !genreValue?.trim() || !platformValue
                }
              >
                Создать
              </Button>
              <Button type="default" htmlType="reset">
                Сбросить{" "}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
