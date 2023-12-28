"use client";

import SpinLoading from "@/components/ui/SpinLoading";
import { FC, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  Button as UploadButton,
  InputNumber,
  Button as AntdButton,
  App,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";
import { Product } from "@/types";
import { useCreateProductMutation } from "@/redux/services/productApiSlice";
import Image from "next/image";
import { useGetCategoriesQuery } from "@/redux/services/categoryApiSlice";

const { Option } = Select;

type SizeType = Parameters<typeof Form>[0]["size"];

interface AddItemProps {
  openModalAdd: boolean;
  handleCloseModal: (type: string) => void;
}

const AddItem: FC<AddItemProps> = ({ openModalAdd, handleCloseModal }) => {
  const { message } = App.useApp();

  // Fetch categories
  const { data: categories } = useGetCategoriesQuery(null);

  const [form] = Form.useForm();
  const [isValideType, setIsValideType] = useState<boolean>(false);
  const [isValideSize, setIsValideSize] = useState<boolean>(false);

  // handle upload image
  const convertToBase64 = (e: any) => {
    const file = e.fileList[0]?.originFileObj;
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          form.setFieldsValue({
            image: reader.result,
          });
        }
      };
      reader?.readAsDataURL(file);
    }
  };

  const beforeUpload = (file: RcFile) => {
    setIsValideType(false);
    setIsValideSize(false);
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isJpgOrPng) {
      setIsValideType(true);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setIsValideSize(true);
    }

    return false;
  };

  const dummyRequest = (options: any) => {
    const { onSuccess } = options;
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  // handle create new product
  const [addNewProduct, { isLoading, isSuccess, isError }] =
    useCreateProductMutation();

  const onFinish = async (values: Product) => {
    try {
      if (isValideSize) {
        return message.error("Image must smaller than 2MB!");
      }
      if (isValideType) {
        return message.error("You can only upload JPG/PNG file!");
      }
      await addNewProduct(values).unwrap();
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Product added successfully");
      handleCloseModal("add");
      form.resetFields();
    }
  }, [isSuccess]);

  return (
    <Modal
      title="Add New Product"
      centered
      open={openModalAdd}
      onOk={() => handleCloseModal("add")}
      onCancel={() => handleCloseModal("add")}
      width={1000}
      footer={[]}
      forceRender
    >
      <div className="p-4">
        <Form
          form={form}
          name="add-new-product"
          onFinish={onFinish}
          className="w-full"
          scrollToFirstError
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          size={"large" as SizeType}
          initialValues={{
            price: 0,
          }}
          preserve={false}
        >
          <div className="mb-4">
            <Form.Item
              name="image"
              rules={[
                {
                  required: true,
                  message: "Image is required!",
                },
              ]}
              valuePropName="list"
              getValueFromEvent={normFile}
            >
              <Upload
                listType="picture"
                customRequest={dummyRequest}
                maxCount={1}
                beforeUpload={beforeUpload}
                onChange={convertToBase64}
              >
                <UploadButton>
                  <div className="flex items-center gap-3">
                    <UploadOutlined className="text-dark" />{" "}
                    <p className="text-dark">Upload Image</p>
                  </div>
                </UploadButton>
              </Upload>
            </Form.Item>
          </div>

          <div className="mb-4">
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Title is required!",
                },
              ]}
            >
              <Input className="w-full" />
            </Form.Item>
          </div>

          <div className="mb-4">
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Description is required!" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </div>

          <div className="mb-4">
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Category is required!" }]}
            >
              <Select>
                {categories?.map(({ name, icon, _id }) => (
                  <Option value={_id} key={_id}>
                    <div className="flex items-center gap-2">
                      <Image
                        src={icon?.url}
                        alt="burger"
                        width={20}
                        height={20}
                      />
                      <p>{name}</p>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="mb-4">
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Price is required!" }]}
            >
              <InputNumber addonAfter="DH" className="w-full" />
            </Form.Item>
          </div>

          <div className="bg-brand/5 border border-brand/10 p-4 rounded-lg mt-4">
            <label className="text-dark pb-1">Options List</label>
            <Form.List name="options">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field) => (
                    <Form.Item
                      label={`Option ${field.key + 1}`}
                      required={false}
                      key={field.key}
                      className="mb-0"
                    >
                      <Form.Item
                        {...field}
                        key={field.key}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please fill option name or delete this field.",
                          },
                        ]}
                        className="mb-0"
                      >
                        <div className="flex items-center gap-2 mb-0">
                          <Input />
                          <div
                            className=" bg-brand cursor-pointer w-8 h-8 rounded-lg text-white flex items-center justify-center"
                            onClick={() => remove(field.name)}
                          >
                            <MinusCircleOutlined />
                          </div>
                        </div>
                      </Form.Item>
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <AntdButton
                      type="dashed"
                      onClick={() => add()}
                      icon={<PlusOutlined />}
                      className="w-full mt-2"
                    >
                      Add Option
                    </AntdButton>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>

          <Row gutter={16} className="mt-6">
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
                key="back"
                type="button"
                variant="outline"
                size="default"
                rounded="full"
                className="gap-2"
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

export default AddItem;
