"use client";

import { App, Layout, ConfigProvider } from "antd";
import { Jost } from "next/font/google";
import { FC } from "react";

const { Content } = Layout;

const jost = Jost({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

interface AuthLayoutProps {
  children: React.ReactNode;
  locale: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children, locale }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFCA40",
        },
      }}
    >
      <App>
        <Content className={`${jost.className}`}>{children}</Content>
      </App>
    </ConfigProvider>
  );
};

export default AuthLayout;
