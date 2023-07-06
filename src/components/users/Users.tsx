"use client";

import { useState, useRef, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPlusCircle } from "react-icons/lu";
import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import DeleteUser from "./DeleteUser";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import DetailsUser from "./DetailsUser";
import Button from "@/components/ui/Button";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef } from "antd";
import { Image, Input, Space, Table, Tag } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import { useGetUsersQuery } from "@/redux/services/userApiSlice";

interface DataType {
  key: string;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
}

type DataIndex = keyof DataType;

// const data: DataType[] = [
//   {
//     key: "1",
//     firstName: "John",
//     lastName: "Brown",
//     email: "jhon@gmail.com",
//   },
//   {
//     key: "2",
//     firstName: "Joe",
//     lastName: "Black",
//     email: "joe@gmail.com",
//   },
//   {
//     key: "3",
//     firstName: "Jim",
//     lastName: "Green",
//     email: "jim@gmail.com",
//   },
// ];

const Users = () => {
  // Fetch all users
  const { data: users, isLoading, isFetching, error } = useGetUsersQuery();

  // manage modal
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [userId, setUserId] = useState("");

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
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
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
      title: "Image",
      render: (record) => (
        <Image
          src={
            record?.image?.url
              ? record?.image?.url
              : "assets/imgs/user-default.png"
          }
          alt={record?.firstName}
          width={40}
          height={40}
          className="rounded-full"
        />
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      ...getColumnSearchProps("firstName"),
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      ...getColumnSearchProps("lastName"),
      sorter: (a, b) => a.lastName.length - b.lastName.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (_, { role }) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => handleOpneModal("detail")}
            className="w-9 h-9 rounded-md bg-brand/30 text-brand flex justify-center items-center"
          >
            <FaEye size={16} />
          </button>
          <button
            onClick={() => handleOpneModal("edit")}
            className="w-9 h-9 rounded-md bg-yellow/30 text-yellow flex justify-center items-center"
          >
            <AiFillEdit size={16} />
          </button>
          <button
            onClick={() => {
              handleOpneModal("delete");
              setUserId(record._id);
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
        <h1 className="text-dark font-semibold mb-5 text-[18px]">List Users</h1>
        <div className="inline-block">
          <Button
            variant="default"
            size="default"
            rounded="full"
            className="flex items-center gap-2"
            onClick={() => handleOpneModal("add")}
          >
            <LuPlusCircle />
            Add User
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={users} />

      {/* Modal Add User */}
      <AddUser
        openModalAdd={openModalAdd}
        handleCloseModal={handleCloseModal}
      />
      {/* Modal Edit User */}
      <EditUser
        openModalEdit={openModalEdit}
        handleCloseModal={handleCloseModal}
      />
      {/* Modal Details User */}
      <DetailsUser
        openModalDetail={openModalDetail}
        handleCloseModal={handleCloseModal}
      />
      {/* Modal Delete User */}
      <DeleteUser
        openModalDelete={openModalDelete}
        handleCloseModal={handleCloseModal}
        userId={userId}
      />
    </>
  );
};

export default Users;
