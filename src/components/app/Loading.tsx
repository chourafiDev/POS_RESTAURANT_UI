import { Spin } from "antd";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spin />
    </div>
  );
};

export default Loading;
