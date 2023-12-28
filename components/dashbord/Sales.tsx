"use client";

import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { useTranslation } from "@/app/i18n/client";

const Sales = ({ locale }: { locale: string }) => {
  const { t } = useTranslation(locale, "sales");

  const option = {
    color: "#ffc94037",
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "#ffffff",
      textStyle: {
        color: "#FFCA40",
      },
      borderWidth: 2,
      borderColor: "#FFCA40",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
      show: false,
    },

    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      boundaryGap: false,
      minimum: 0,
    },
    yAxis: {
      type: "value",
      splitLine: { show: false },
    },
    series: [
      {
        type: "line",
        smooth: true,
        lineStyle: {
          color: "#FFCA40",
          width: 2,
        },
        areaStyle: {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            { offset: 0, color: "#FFCA40" },
            { offset: 1, color: "#ffc94028" },
          ]),
        },
        emphasis: { focus: "series" },
        showSymbol: false,
        data: [200, 1200, 600, 1600, 1000, 2260, 800],
      },
    ],
  };
  return (
    <div className="bg-white rounded-xl w-4/6 p-5">
      <h2 className="text-dark font-semibold text-lg">
        {t("dashboard.dailySales")}
      </h2>
      <ReactECharts option={option} />
    </div>
  );
};

export default Sales;
