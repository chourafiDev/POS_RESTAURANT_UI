import { useTranslation } from "@/app/i18n/client";
import { Layout } from "antd";
import Link from "next/link";
import React from "react";

const { Footer: AntdFooter } = Layout;

const Footer = ({ locale }: { locale: string }) => {
  const { t } = useTranslation(locale, "footer");
  return (
    <AntdFooter className="bg-white text-center">
      <p className="text-dark/80 font-medium">
        Dissh ©{new Date().getFullYear()} {t("footer")}{" "}
        <Link href="https://www.chourafidev.com/" legacyBehavior>
          <a target="_blank" rel="noopener noreferrer" className="text-brand">
            Abdelmonaime Chourafi
          </a>
        </Link>
      </p>
    </AntdFooter>
  );
};

export default Footer;
