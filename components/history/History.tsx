"use client";

import { RiDeleteBin5Fill } from "react-icons/ri";
import DeleteHistory from "./DeleteHistory";
import { Space, Table, Tag, DatePicker } from "antd";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { useGetAllHistoriesQuery } from "@/redux/services/historyApiSlice";
import { History } from "@/types";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";

const { RangePicker } = DatePicker;

const History = () => {
  // manage modal
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [historyId, setHistoryId] = useState("");
  const [modaleDeleteType, setModaleDeleteType] = useState("");

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Fetch all tables
  const { data: histories, isLoading } = useGetAllHistoriesQuery({
    startDate,
    endDate,
  });

  function handleOpneModal() {
    setOpenModalDelete(true);
  }
  function handleCloseModal() {
    setOpenModalDelete(false);
  }

  // handle table data
  const columns: ColumnsType<History> = [
    {
      title: "Action",
      dataIndex: "action",
      key: "number",
    },
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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              handleOpneModal();
              setHistoryId(record._id);
              setModaleDeleteType("deleteOne");
            }}
            className="w-9 h-9 rounded-md bg-red/30 text-red flex justify-center items-center"
          >
            <RiDeleteBin5Fill size={16} />
          </button>
        </Space>
      ),
    },
  ];

  // rowSelection object indicates the need for row selection
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRows(selectedRowKeys);
    },
  };

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
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-dark font-medium text-[17px]">List History</h1>
          <AnimatePresence initial={false}>
            {selectedRows.length > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.75 / 2, delay: 0.75 / 2 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.75 / 2 } }}
                className="flex gap-4 items-center"
              >
                <p className="text-dark text-[16px]">
                  You have selected {selectedRows.length} items
                </p>
                <div>
                  <Button
                    variant="destructive"
                    size="default"
                    rounded="full"
                    className="gap-3"
                    onClick={() => {
                      handleOpneModal();
                      setModaleDeleteType("deleteMany");
                    }}
                  >
                    Delete <RiDeleteBin5Fill size={16} />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <RangePicker onChange={handleOnChangeDateRange} />
        </div>

        <Table
          columns={columns}
          dataSource={histories}
          rowKey={(record) => record._id}
          loading={isLoading}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "30"],
          }}
        />
      </div>

      {/* Modal Delete History */}
      <DeleteHistory
        openModalDelete={openModalDelete}
        handleCloseModal={handleCloseModal}
        historyId={historyId}
        historyIds={selectedRows}
        setSelectedRows={setSelectedRows}
        modaleDeleteType={modaleDeleteType}
      />
    </>
  );
};

export default History;
