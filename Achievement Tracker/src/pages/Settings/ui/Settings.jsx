import { DownloadJson, UploadJson } from "@features/manageBackup";
import { Flex } from "antd";
export function Settings() {
  return (
    <>
      <Flex vertical gap={20} style={{ maxWidth: "400px" }}>
        <DownloadJson></DownloadJson>

        <UploadJson></UploadJson>
      </Flex>
    </>
  );
}
