"use client";

import React, { FC, useEffect, useState, createRef, RefObject } from "react";
import Button from "@/components/ui/Button";
import { Modal, Form, Input, Row, Col, message, Space } from "antd";
import { loading } from "@/utils/assets";
import Image from "next/image";
import { categories } from "@/utils/data";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "@/redux/services/categoryApiSlice";
import { Category } from "../../../../types";

type SizeType = Parameters<typeof Form>[0]["size"];

interface AddCategoryProps {
  openModalEdit: boolean;
  handleCloseModal: (type: string) => void;
  categoryId: string;
}

const { TextArea } = Input;

const EditCategory: FC<AddCategoryProps> = ({
  openModalEdit,
  handleCloseModal,
  categoryId,
}) => {
  const [form] = Form.useForm();

  const {
    data: categoryById,
    isLoading: isCategoryLoading,
    isFetching,
    isSuccess: isGetCategorySuccess,
    error,
  } = useGetCategoryByIdQuery(categoryId);

  // handle upload category icon
  const [selectedCategory, setSelectedCategory] = useState(
    categoryById?.name ? categoryById?.name : ""
  );

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

  // handle edit category
  const [updateCategory, { isLoading, isSuccess, isError }] =
    useUpdateCategoryMutation();

  const onFinish = async ({ description }: { description: string }) => {
    try {
      // if (selectedCategory === "") {
      //   return message.error("You should choose a category!");
      // }

      const data: Category = {
        name: "",
        icon: "",
        // name: selectedCategory,
        // icon: iconBase64,
        description,
      };

      await updateCategory({ data, categoryId }).unwrap();
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (categoryById) {
      // setUserImage(user?.image?.url);
      form.setFieldsValue({
        description: categoryById.description,
      });
    }
  }, [categoryById, form]);

  useEffect(() => {
    if (isSuccess) {
      message.success("Category updated successfully");
      handleCloseModal("edit");
      form.resetFields();
    }
  }, [isSuccess]);

  console.log("selectedCategory", selectedCategory);
  console.log("categ nma", categoryById?.name);
  console.log("category one from edit modal", categoryById);

  return (
    <Modal
      title="Edit Category"
      centered
      open={openModalEdit}
      onOk={() => handleCloseModal("edit")}
      onCancel={() => handleCloseModal("edit")}
      width={700}
      footer={[]}
    >
      <div className="p-4">
        <Form
          form={form}
          name="edit-category"
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
                      width={20}
                      height={20}
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

          <Row gutter={16}>
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
                    <Image src={loading} alt="loading" width="16" height="16" />
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

export default EditCategory;
