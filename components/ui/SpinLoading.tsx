import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FC } from "react";

interface SpinLoadingProps {
  color: string;
}

const SpinLoading: FC<SpinLoadingProps> = ({ color }) => {
  return (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 18, color }} spin />}
    />
  );
};

export default SpinLoading;
