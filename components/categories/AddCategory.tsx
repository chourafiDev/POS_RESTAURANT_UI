"use client";

import React, { FC, useEffect, useState, createRef, RefObject } from "react";
import Button from "@/components/ui/Button";
import { Modal, Form, Input, Row, Col, message, Space } from "antd";
import Image from "next/image";
import { categories } from "@/utils/data";
import { useCreateCategoryMutation } from "@/redux/services/categoryApiSlice";
import SpinLoading from "@/components/ui/SpinLoading";

type SizeType = Parameters<typeof Form>[0]["size"];

interface AddCategoryProps {
  openModalAdd: boolean;
  handleCloseModal: (type: string) => void;
}

const { TextArea } = Input;

const AddCategory: FC<AddCategoryProps> = ({
  openModalAdd,
  handleCloseModal,
}) => {
  const [form] = Form.useForm();

  // handle upload category icon
  const [selectedCategory, setSelectedCategory] = useState("");
  const [iconBase64, setIconBase64] = useState("");
  const categorLength = categories.length;
  const [elRefs, setElRefs] = useState<Array<RefObject<HTMLImageElement>>>([]);

  useEffect(() => {
    setElRefs((elRefs) =>
      Array(categorLength)
        .fill(null)
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [categorLength]);

  const handleClick = async (index: number, name: string) => {
    setSelectedCategory(name);

    // get icon base64
    const image = elRefs[index].current;

    if (image) {
      try {
        const response = await fetch(image.src);
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          setIconBase64(base64);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // handle add new category
  const [addNewCategory, { isLoading, isSuccess, isError }] =
    useCreateCategoryMutation();

  const onFinish = async ({ description }: { description: string }) => {
    try {
      if (selectedCategory === "") {
        return message.error("You should choose a category!");
      }
      const data = {
        name: selectedCategory,
        icon: iconBase64,
        description,
      };
      await addNewCategory(data).unwrap();
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Category added successfully");
      handleCloseModal("add");
      form.resetFields();
      setSelectedCategory("");
      setIconBase64("");
    }
  }, [isSuccess]);

  return (
    <Modal
      title="Add New Category"
      centered
      open={openModalAdd}
      onOk={() => handleCloseModal("add")}
      onCancel={() => handleCloseModal("add")}
      width={700}
      footer={[]}
      forceRender
    >
      <div className="p-4">
        <Form
          form={form}
          name="add-category"
          onFinish={onFinish}
          className="w-full"
          scrollToFirstError
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          size={"large" as SizeType}
          initialValues={{ password: "" }}
          preserve={false}
        >
          <div className="mb-6">
            <p className="mb-2 text-dark">Choose Category</p>
            <div className="flex flex-wrap gap-2 items-center">
              {categories.map(({ id, name, icon }, i) => (
                <Space
                  key={id}
                  onClick={() => handleClick(i, name)}
                  className={`border rounded-full pl-1 pr-3 py-[2px] cursor-pointer ease-in-out duration-150 ${
                    selectedCategory === name
                      ? "border-brand bg-brand text-white"
                      : "border-gray/40"
                  }`}
                >
                  <div
                    className={`w-[30px] h-[30px] flex items-center justify-center ${
                      selectedCategory === name
                        ? "bg-white/40 rounded-full"
                        : ""
                    }`}
                  >
                    <Image
                      src={icon}
                      ref={elRefs[i]}
                      alt={name}
                      width={25}
                      height={25}
                    />
                  </div>
                  {name}
                </Space>
              ))}
            </div>
          </div>

          <Form.Item name="description" label="Description">
            <TextArea rows={4} />
          </Form.Item>

          <Row gutter={16} className="mt-8">
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
                    <span>Add</span>
                  </>
                ) : (
                  <span>Add</span>
                )}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                variant="outline"
                size="default"
                rounded="full"
                className="gap-2"
                type="button"
                onClick={() => handleCloseModal("add")}
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

export default AddCategory;
