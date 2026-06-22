import DownloadJson from "../../components/DownloadJson";
import UploadJson from "../../components/UploadJson";
import { Flex } from "antd";
export default function Settings() {
  return (
    <>
      <Flex vertical gap={20} style={{ maxWidth: "400px" }}>
        <DownloadJson></DownloadJson>

        <UploadJson></UploadJson>
      </Flex>
    </>
  );
}
