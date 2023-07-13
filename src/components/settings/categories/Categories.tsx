"use client";

import { useState, useRef, useEffect, FC } from "react";
import { motion } from "framer-motion";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPlusCircle } from "react-icons/lu";
import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import DeleteCategory from "./DeleteCategory";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import Button from "@/components/ui/Button";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Image, Input, Space, Table, Tag, Button as AntdButton } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useGetCategoriesQuery } from "@/redux/services/categoryApiSlice";

interface DataType {
  key: string;
  _id: string;
  name: string;
  icon: string;
}

type DataIndex = keyof DataType;

interface CategoriesProps {
  active: boolean;
}

const Categories: FC<CategoriesProps> = ({ active }) => {
  const tabContentVariant = {
    active: {
      display: "block",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    inactive: {
      display: "none",
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Fetch all categories
  const {
    data: categories,
    isLoading,
    isFetching,
    error,
  } = useGetCategoriesQuery();

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
      case "detail":
        setOpenModalDetail(true);
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
      case "detail":
        setOpenModalDetail(false);
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
  ): ColumnType<DataType> => ({
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
      record[dataIndex]
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

  const columns: ColumnsType<DataType> = [
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

  console.log("categories from table", categories);

  return (
    <>
      <motion.div
        variants={tabContentVariant}
        animate={active ? "active" : "inactive"}
        initial="inactive"
        className="form bg-white rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-dark font-semibold mb-5 text-[18px]">
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
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          rowKey={(record) => record.name}
          pagination={{
            defaultPageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "30"],
          }}
        />
      </motion.div>

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
