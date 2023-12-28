"use client";

import { useTranslation } from "@/app/i18n/client";
import ReactECharts from "echarts-for-react";

const Income = ({ locale }: { locale: string }) => {
  const { t } = useTranslation(locale, "income");

  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "0%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };
  return (
    <div className="bg-white rounded-xl w-2/6 p-5">
      <h2 className="text-dark font-semibold text-lg mb-3">
        {t("dashboard.totalIncome")}
      </h2>
      <ReactECharts option={option} />
    </div>
  );
};

export default Income;
