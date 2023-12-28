"use client";

import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { oredrs } from "@/utils/data";
import Image from "next/image";
import { useTranslation } from "@/app/i18n/client";

interface DataType {
  id: number;
  title: string;
  price: number;
  total: number;
  image: string;
}

type DataIndex = keyof DataType;

const LatestOrders = ({ locale }: { locale: string }) => {
  const { t } = useTranslation(locale, "latest-orders");

  // handle table data
  const columns: ColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, { image }) => (
        <Image
          className="rounded-lg"
          src={`/assets/imgs/orders/${image}`}
          alt="order-image"
          width={60}
          height={40}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, { price }) => <span>${price}</span>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-xl mt-8">
      <h1 className="text-dark font-semibold text-lg mb-3">
        {t("dashboard.latestOrders")}
      </h1>
      <Table
        columns={columns}
        dataSource={oredrs}
        rowKey={(record) => record.id}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
        }}
      />
    </div>
  );
};

export default LatestOrders;
