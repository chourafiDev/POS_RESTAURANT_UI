"use client";

import AnimatinCards from "@/components/ui/AnimationCards";
import { DatePicker } from "antd";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import Card from "./Card";
import { statistics } from "@/utils/data";
import { useTranslation } from "@/app/i18n/client";

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

const Statistics = ({ locale }: { locale: string }) => {
  const { t } = useTranslation(locale, "statistcis");
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-dark font-medium text-[23px]">
          {t("dashboard.statistics")}
        </h1>
        <RangePicker format={dateFormat} />
      </div>
      <AnimatinCards className="d-flex gap-16 flex-wrap items-center">
        <div className="grid grid-cols-4 gap-4 w-full">
          {statistics.map((statistic) => (
            <Card statistic={statistic} key={statistic.id} t={t} />
          ))}
        </div>
      </AnimatinCards>
    </div>
  );
};

export default Statistics;
