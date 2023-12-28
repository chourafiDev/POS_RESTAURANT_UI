"use client";

import { App, Layout, ConfigProvider } from "antd";
import { Jost } from "next/font/google";
import { FC, useState } from "react";
import SideBarContent from "@/components/core/Sidebar/SideBarContent";
import TopBar from "@/components/core/TopBar";
import Footer from "@/components/core/Footer";
import { useTranslation } from "@/app/i18n/client";
import { usePathname } from "next/navigation";

const { Content } = Layout;

const jost = Jost({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

interface AppLayoutProps {
  children: React.ReactNode;
  locale: string;
}

const AppLayout: FC<AppLayoutProps> = ({ children, locale }) => {
  const pathname = usePathname();
  const expectPathname = pathname.split("/")[2];
  const [collapsed, setCollapsed] = useState(false);

  const { t } = useTranslation(locale, "app-layout");

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FFCA40",
        },
      }}
    >
      <App>
        {expectPathname == "menu" ? (
          <>{children}</>
        ) : (
          <Layout>
            <SideBarContent
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              locale={locale}
            />
            <Layout
              className="site-layout"
              style={{
                marginLeft: collapsed ? 77 : 240,
                transition: "all 0.2s ease",
              }}
            >
              <TopBar t={t} locale={locale} />
              <Content
                className={`p-5 ${jost.className}`}
                style={{
                  minHeight: 280,
                }}
              >
                {children}
              </Content>
              <Footer locale={locale} />
            </Layout>
          </Layout>
        )}
      </App>
    </ConfigProvider>
  );
};

export default AppLayout;
