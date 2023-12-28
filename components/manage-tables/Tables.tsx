"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPlusCircle } from "react-icons/lu";
import { AiFillEdit } from "react-icons/ai";
import DeleteTable from "./DeleteTable";
import Button from "@/components/ui/Button";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetTablesQuery } from "@/redux/services/tableApiSlice";
import { Table as ITable } from "../../../types";

// Fixes: Hydration failed because the initial UI does not match what was rendered on the server.
const AddTable = dynamic(() => import("./AddTable"), {
  ssr: false,
});
const EditTable = dynamic(() => import("./EditTable"), {
  ssr: false,
});

const Tables = () => {
  // Fetch all tables
  const { data: tables, isLoading } = useGetTablesQuery(null);

  // manage modal
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [tableId, setTableId] = useState("");

  function handleOpneModal(type: string) {
    switch (type) {
      case "add":
        setOpenModalAdd(true);
        break;
      case "edit":
        setOpenModalEdit(true);
        break;
      case "delete":
        setOpenModalDelete(true);
        break;

      default:
        break;
    }
  }
  const handleCloseModal = useCallback((type: string) => {
    switch (type) {
      case "add":
        setOpenModalAdd(false);
        break;
      case "edit":
        setOpenModalEdit(false);
        break;
      case "delete":
        setOpenModalDelete(false);
        break;

      default:
        break;
    }
  }, []);

  // handle table data
  const columns: ColumnsType<ITable> = [
    {
      title: "Numbers",
      dataIndex: "number",
      key: "number",
      render: (_, { number }) => <span>{`T-${number}`}</span>,
    },
    {
      title: "Number Of Guests",
      dataIndex: "numberOfGuests",
      key: "numberOfGuests",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <Tag
          color={`${
            status == "Available"
              ? "#4F83F3"
              : status == "Booked"
              ? "#F97316"
              : status == "Billed"
              ? "#46A094"
              : "#CDCDCE"
          }`}
        >
          {status}
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
              handleOpneModal("edit");
              setTableId(record._id);
            }}
            className="w-9 h-9 rounded-md bg-yellow/30 text-yellow flex justify-center items-center"
          >
            <AiFillEdit size={16} />
          </button>
          <button
            onClick={() => {
              handleOpneModal("delete");
              setTableId(record._id);
            }}
            className="w-9 h-9 rounded-md bg-red/30 text-red flex justify-center items-center"
          >
            <RiDeleteBin5Fill size={16} />
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-dark font-medium mb-5 text-[17px]">List Tables</h1>
        <div className="inline-block">
          <Button
            variant="default"
            size="default"
            rounded="full"
            className="flex items-center gap-2"
            onClick={() => handleOpneModal("add")}
          >
            <LuPlusCircle />
            Add Table
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={tables}
        loading={isLoading}
        rowKey={(recorde) => recorde.number}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
        }}
      />

      {/* Modal Add Table */}
      <AddTable
        openModalAdd={openModalAdd}
        handleCloseModal={handleCloseModal}
      />
      {/* Modal Edit Table */}
      <EditTable
        openModalEdit={openModalEdit}
        handleCloseModal={handleCloseModal}
        tableId={tableId}
      />

      {/* Modal Delete Table */}
      <DeleteTable
        openModalDelete={openModalDelete}
        handleCloseModal={handleCloseModal}
        tableId={tableId}
      />
    </>
  );
};

export default Tables;
