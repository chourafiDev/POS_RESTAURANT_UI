import { message } from "antd";

export const toastMessage = (type: string, content: string) => {
  const [messageApi, contextHolder] = message.useMessage();

  switch (type) {
    case "success":
      messageApi.open({
        type,
        content,
      });
      break;
    case "error":
      messageApi.open({
        type,
        content,
      });
      break;
    case "warning":
      messageApi.open({
        type,
        content,
      });
      break;

    default:
      break;
  }
};
