"use client";

import { Table, Tag, DatePicker } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { useGetMyHistoriesQuery } from "@/redux/services/historyApiSlice";
import { History } from "@/types";
import moment from "moment";

const { RangePicker } = DatePicker;

const History = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Fetch history tables
  const { data: histories, isLoading } = useGetMyHistoriesQuery({
    startDate,
    endDate,
  });

  // handle table data
  const columns: ColumnsType<History> = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => (
        <p>{moment(createdAt).format("DD-MM-Y")}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, { action }) => (
        <Tag
          color={`${
            action == "Modification"
              ? "#4F83F3"
              : action == "Delete"
              ? "#ff686b"
              : "#46A094"
          }`}
        >
          {action}
        </Tag>
      ),
    },
  ];

  // handle change date
  const handleOnChangeDateRange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      const startDateFormatted = dates[0].format("YYYY-MM-DD");
      const endDateFormatted = dates[1].format("YYYY-MM-DD");

      setStartDate(startDateFormatted);
      setEndDate(endDateFormatted);
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-dark font-medium text-[17px]">My History</h1>
        <RangePicker onChange={handleOnChangeDateRange} />
      </div>

      <Table
        columns={columns}
        dataSource={histories}
        rowKey={(record) => record._id}
        loading={isLoading}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
        }}
      />
    </div>
  );
};

export default History;
