import React, { FC } from "react";
import SideBarLogo from "./SideBarLogo";
import { Layout, Menu } from "antd";
import { usePathname } from "next/navigation";
import {
  HomeOutlined,
  LayoutOutlined,
  ClockCircleOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  ShoppingOutlined,
  TableOutlined,
  InsertRowAboveOutlined,
  InfoCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Jost } from "next/font/google";
import UserInfo from "./UserInfo";
import type { MenuProps } from "antd";
import { useTranslation } from "@/app/i18n/client";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";

const { Sider } = Layout;

const jost = Jost({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

interface SideBarContentProps {
  collapsed: boolean;
  setCollapsed: (item: boolean) => void;
  locale: string;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SideBarContent: FC<SideBarContentProps> = ({
  collapsed,
  setCollapsed,
  locale,
}) => {
  // Fetch current user
  const { data: user } = useGetCurrentUserQuery(null);

  const { t } = useTranslation(locale, "sidebar-content");

  const pathname = usePathname();
  const selectedKeys = pathname;

  // handle access menu items
  const managementItems =
    // user?.role == "admin"
    // ?
    [
      getItem(
        <Link
          href={`/${locale}/users`}
          className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
        >
          {t("sidebar.managementContent.users")}
        </Link>,
        `/${locale}/users`,
        <TeamOutlined style={{ fontSize: "120%", marginRight: 10 }} />
      ),
      getItem(
        <Link
          href={`/${locale}/products`}
          className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
        >
          {t("sidebar.managementContent.products")}
        </Link>,
        `/${locale}/products`,
        <ShoppingOutlined style={{ fontSize: "120%", marginRight: 10 }} />
      ),
      getItem(
        <Link
          href={`/${locale}/categories`}
          className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
        >
          {t("sidebar.managementContent.categories")}
        </Link>,
        `/${locale}/categories`,
        <InsertRowAboveOutlined style={{ fontSize: "120%", marginRight: 10 }} />
      ),
      getItem(
        <Link
          href={`/${locale}/manage-tables`}
          className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
        >
          {t("sidebar.managementContent.manageTables")}
        </Link>,
        `/${locale}/manage-tables`,
        <TableOutlined style={{ fontSize: "120%", marginRight: 10 }} />
      ),
    ];
  // : [];

  const allHistoryItem =
    // user?.role == "admin"
    //   ?
    getItem(
      <Link
        href={`/${locale}/all-history`}
        className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
      >
        {t("sidebar.managementContent.historyContent.allHistory")}
      </Link>,
      `/${locale}/all-history`,
      null
    );
  // : null;

  const items: MenuProps["items"] = [
    { type: "divider" },
    getItem(
      `${t("sidebar.main")}`,
      "main",
      null,
      [
        getItem(
          <Link
            href={`/${locale}/dashboard`}
            className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
          >
            {t("sidebar.mainContent.dashboard")}
          </Link>,
          `/${locale}/dashboard`,
          <HomeOutlined style={{ fontSize: "120%", marginRight: 10 }} />
        ),
      ],
      "group"
    ),

    getItem(
      `${t("sidebar.passOrders")}`,
      "pass-orders",
      null,
      [
        getItem(
          <Link
            href={`/${locale}/tables`}
            className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
          >
            {t("sidebar.passOrdersContent.tables")}
          </Link>,
          `/${locale}/tables`,
          <LayoutOutlined style={{ fontSize: "120%", marginRight: 10 }} />
        ),
        getItem(
          <Link
            href={`/${locale}/orders`}
            className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
          >
            {t("sidebar.passOrdersContent.orders")}
          </Link>,
          `/${locale}/orders`,
          <ShoppingCartOutlined style={{ fontSize: "120%", marginRight: 10 }} />
        ),
      ],
      "group"
    ),

    getItem(
      `${t("sidebar.management")}`,
      "management",
      null,
      [
        ...managementItems,
        getItem(
          `${t("sidebar.managementContent.history")}`,
          "history",
          <ClockCircleOutlined style={{ fontSize: "120%", marginRight: 10 }} />,
          [
            getItem(
              <Link
                href={`/${locale}/history`}
                className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
              >
                {t("sidebar.managementContent.historyContent.myHistory")}
              </Link>,
              `/${locale}/history`,
              null
            ),
            allHistoryItem,
          ]
        ),
      ],
      "group"
    ),

    { type: "divider" },

    getItem(
      <Link
        href={`/${locale}/settings`}
        className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
      >
        {t("sidebar.settings")}
      </Link>,
      `/${locale}/settings`,
      <SettingOutlined style={{ fontSize: "120%", marginRight: 10 }} />
    ),

    getItem(
      <Link
        href={`/${locale}/help`}
        className="text-[14px] hover:text-brand text-brand duration-75 ease-in"
      >
        {t("sidebar.help")}
      </Link>,
      `/${locale}/help`,
      <InfoCircleOutlined style={{ fontSize: "120%", marginRight: 10 }} />
    ),
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      className={`${
        collapsed
          ? "ant-layout-sider-collapsed"
          : "ant-layout-sider-no-collapsed"
      } ${jost.className}`}
    >
      <SideBarLogo collapsed={collapsed} setCollapsed={setCollapsed} />
      <UserInfo collapsed={collapsed} locale={locale} />

      <Menu
        selectedKeys={[selectedKeys]}
        theme="dark"
        mode="inline"
        className="overflow-y-auto h-[475px] sidebar-scroll-content"
        items={items}
      />
    </Sider>
  );
};

export default SideBarContent;
