"use client";

import React, { FC, memo, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import {
  Modal,
  Form,
  Row,
  Col,
  message,
  Space,
  Select,
  SelectProps,
} from "antd";
import { statusList } from "@/utils/data";
import {
  useGetTableByIdQuery,
  useUpdateTableMutation,
} from "@/redux/services/tableApiSlice";
import SpinLoading from "@/components/ui/SpinLoading";

type SizeType = Parameters<typeof Form>[0]["size"];

interface EditTableProps {
  openModalEdit: boolean;
  handleCloseModal: (type: string) => void;
  tableId: any;
}

const EditTable: FC<EditTableProps> = ({
  openModalEdit,
  handleCloseModal,
  tableId,
}) => {
  const [form] = Form.useForm();

  const options: SelectProps["options"] = [];

  for (let i = 1; i < 50; i++) {
    options.push({
      value: i,
      label: `T-${i}`,
    });
  }

  // handle select number of guests and status
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [status, setStatus] = useState("");

  const handleSelectGuests = async (number: number) => {
    setNumberOfGuests(number);
  };

  const handleSelectStatus = async (status: string) => {
    setStatus(status);
  };

  // handle edit  table
  const { data: table, isLoading: isTableLoading } =
    useGetTableByIdQuery(tableId);

  useEffect(() => {
    if (table && openModalEdit) {
      setStatus(table.status);
      setNumberOfGuests(table.numberOfGuests);
      form.setFieldsValue({
        number: table.number,
      });
    }
  }, [openModalEdit, table, form]);

  const [updateTable, { isLoading, isSuccess }] = useUpdateTableMutation();

  const handleUpdateTable = async ({ number }: { number: number }) => {
    try {
      if (numberOfGuests === 0) {
        return message.error("You should select number of guests!");
      }
      if (status === "") {
        return message.error("You should select status!");
      }
      const data = {
        numberOfGuests: numberOfGuests,
        status: status,
        number,
      };

      await updateTable({ data, tableId }).unwrap();
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Table updated successfully");
      handleCloseModal("edit");
    }
  }, [isSuccess]);

  return (
    <Modal
      title="Edit Table"
      centered
      open={openModalEdit}
      onOk={() => {
        form.resetFields();
        setNumberOfGuests(0);
        setStatus("");
      }}
      onCancel={() => handleCloseModal("edit")}
      width={700}
      footer={[]}
      forceRender
    >
      <div className="p-4">
        <Form
          form={form}
          name={`edit-table-${tableId}`}
          onFinish={handleUpdateTable}
          className="w-full"
          scrollToFirstError
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          size={"large" as SizeType}
          preserve={false}
        >
          <Form.Item
            name="number"
            label="Number Of Table"
            rules={[
              {
                required: true,
                message: "Number is required!",
              },
            ]}
          >
            <Select optionFilterProp="items" options={options} />
          </Form.Item>

          <div className="mb-6">
            <p className="mb-2 text-dark">Select Status</p>
            <div className="flex flex-wrap gap-2 items-center">
              {statusList.map((el, i) => (
                <div
                  key={i}
                  onClick={() => handleSelectStatus(el)}
                  className={`${
                    status === el && el === "Available"
                      ? "bg-blue/10 border-blue/5"
                      : status === el && el === "Booked"
                      ? "bg-orange-50 border-orange-50"
                      : status === el && el === "Billed"
                      ? "bg-brand/20 border-brand/10"
                      : status === el && el === "Occupied"
                      ? "bg-gray/10 border-gray/5"
                      : ""
                  }  flex items-center gap-2 border border-gray-light rounded-full py-1 pl-1 pr-6 cursor-pointer ease-in-out duration-150`}
                >
                  <div
                    className={`${
                      el == "Available"
                        ? "bg-blue/20"
                        : el == "Booked"
                        ? "bg-orange-100"
                        : el == "Billed"
                        ? "bg-brand/30"
                        : "bg-gray/20"
                    }  w-7 h-7 rounded-full flex justify-center items-center`}
                  >
                    <div
                      className={`${
                        el == "Available"
                          ? "bg-blue shadow-blue/40"
                          : el == "Booked"
                          ? "bg-orange-500 shadow-orange-400"
                          : el == "Billed"
                          ? "bg-brand shadow-brand/40"
                          : "bg-gray/60 shadow-gray"
                      }  w-4 h-4 rounded-full shadow-xl`}
                    ></div>
                  </div>
                  <p className="text-dark/60 font-medium">{el}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-dark">Select Number of Guests</p>
            <div className="flex flex-wrap gap-2 items-center">
              {[4, 6, 8].map((el, i) => (
                <Space
                  key={i}
                  onClick={() => handleSelectGuests(el)}
                  className={`border rounded-full px-8 py-[5px] text-dark font-medium cursor-pointer ease-in-out duration-150 ${
                    numberOfGuests === el
                      ? "border-brand/40 bg-brand/60 text-white"
                      : "border-gray/40"
                  }`}
                >
                  {el}
                </Space>
              ))}
            </div>
          </div>

          <Row gutter={16} className="mt-10">
            <Col span={12}>
              <Button
                variant="default"
                size="default"
                rounded="full"
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <SpinLoading color="#264653" />
                    <span>Edit</span>
                  </>
                ) : (
                  <span>Edit</span>
                )}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                key="back"
                variant="outline"
                size="default"
                rounded="full"
                className="gap-2"
                onClick={() => handleCloseModal("edit")}
                type="button"
              >
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default memo(EditTable);
