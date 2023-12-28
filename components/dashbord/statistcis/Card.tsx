import { BiDownArrowAlt } from "react-icons/bi";
import { cardVariant } from "@/utils/animation";
import { motion } from "framer-motion";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { FC } from "react";
import { truncate } from "fs";

interface StatisticCard {
  statistic: { id: string; total: number };
  t: any;
}

const Card: FC<StatisticCard> = ({ statistic: { id, total }, t }) => {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      boundaryGap: false,
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      type: "value",
      splitLine: { show: false },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
    },
    series: [
      {
        data: [200, 1200, 600, 1600, 1000, 2260, 800],
        type: "line",
        smooth:
          id === "revenue"
            ? false
            : id === "totalOrders"
            ? false
            : id === "totalCustomers"
            ? true
            : true,
        lineStyle: {
          width: 0,
        },
        areaStyle: {
          color:
            id === "revenue"
              ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#FDBB2D" },
                  { offset: 1, color: "#3A1C71" },
                ])
              : id === "totalOrders"
              ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#00C9FF" },
                  { offset: 1, color: "#92FE9D" },
                ])
              : id === "totalCustomers"
              ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#d53369" },
                  { offset: 1, color: "#daae51" },
                ])
              : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#1CB5E0" },
                  { offset: 1, color: "#000851" },
                ]),
        },

        emphasis: { focus: "series" },
        showSymbol: false,
      },
    ],
  };
  return (
    <motion.div variants={cardVariant}>
      <div className="h-[133px] bg-white border border-gray-light/70 rounded-xl relative overflow-hidden shadow-lg shadow-gray-light/40">
        <div className="px-3 py-2">
          <div className="flex gap-2">
            <h2 className="text-dark/60 font-semibold text-[22px]">
              {id === "revenue" ? `$${total}` : total}
            </h2>
            <p className="text-red flex items-center text-[14px] font-medium">
              <BiDownArrowAlt className="font-semibold" size={20} /> 10%
            </p>
          </div>
          <h5 className="text-dark/60 font-medium text-[15px]">
            {id == "revenue"
              ? `${t("dashboard.revenue")}`
              : id == "totalOrders"
              ? `${t("dashboard.totalOrders")}`
              : id == "totalCustomers"
              ? `${t("dashboard.totalCustomers")}`
              : `${t("dashboard.totalEmployees")}`}
          </h5>
        </div>
        <ReactECharts
          option={option}
          style={{ height: "65px", width: "334px" }}
          className="absolute bottom-[-6px] left-[-34px]"
        />
      </div>
    </motion.div>
  );
};

export default Card;
