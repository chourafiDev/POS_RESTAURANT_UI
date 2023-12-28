"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPlusCircle } from "react-icons/lu";
import { AiFillEdit } from "react-icons/ai";
import DeleteCategory from "./DeleteCategory";
import Button from "@/components/ui/Button";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Input, Space, Table, Button as AntdButton } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useGetCategoriesQuery } from "@/redux/services/categoryApiSlice";
import { Category } from "@/types";
import Image from "next/image";

// Fixes: Hydration failed because the initial UI does not match what was rendered on the server.
const AddCategory = dynamic(() => import("./AddCategory"), {
  ssr: false,
});
const EditCategory = dynamic(() => import("./EditCategory"), {
  ssr: false,
});

type DataIndex = keyof Category;

const Categories = () => {
  // Fetch all categories
  const { data: categories, isLoading } = useGetCategoriesQuery(null);

  // manage modal
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [categoryId, setCategoryId] = useState("");

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

  function handleCloseModal(type: string) {
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
  }

  // handle table data
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<Category> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <AntdButton
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </AntdButton>
          <AntdButton
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </AntdButton>
          <AntdButton
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </AntdButton>
          <AntdButton
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </AntdButton>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      (record[dataIndex] ?? "")
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<Category> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Icon",
      key: "icon",
      render: (record) => (
        <Image
          src={record?.icon?.url}
          alt={record?.name}
          width={40}
          height={40}
          className="rounded-full"
        />
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
              setCategoryId(record._id);
            }}
            className="w-9 h-9 rounded-md bg-yellow/30 text-yellow flex justify-center items-center"
          >
            <AiFillEdit size={16} />
          </button>
          <button
            onClick={() => {
              handleOpneModal("delete");
              setCategoryId(record._id);
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
        <h1 className="text-dark font-medium mb-5 text-[17px]">
          List Categories
        </h1>
        <div className="inline-block">
          <Button
            variant="default"
            size="default"
            rounded="full"
            className="flex items-center gap-2"
            onClick={() => handleOpneModal("add")}
          >
            <LuPlusCircle />
            Add Category
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        expandable={{
          expandedRowRender: (record) => (
            <>
              <p className="text-dark mb-2 font-medium">Description</p>
              <p>{record.description}</p>
            </>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        rowKey={(record) => record.name}
        loading={isLoading}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "30"],
        }}
      />

      {/* Modal Add Category */}
      <AddCategory
        openModalAdd={openModalAdd}
        handleCloseModal={handleCloseModal}
      />

      {/* Modal Edit Category */}
      <EditCategory
        openModalEdit={openModalEdit}
        handleCloseModal={handleCloseModal}
        categoryId={categoryId}
      />

      {/* Modal Delete Category */}
      <DeleteCategory
        openModalDelete={openModalDelete}
        handleCloseModal={handleCloseModal}
        categoryId={categoryId}
      />
    </>
  );
};

export default Categories;
