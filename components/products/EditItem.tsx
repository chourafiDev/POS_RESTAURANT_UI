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
import { Product } from "../../../types";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/services/productApiSlice";
import Image from "next/image";
import { useGetCategoriesQuery } from "@/redux/services/categoryApiSlice";

const { Option } = Select;

type SizeType = Parameters<typeof Form>[0]["size"];

interface EditItemProps {
  openModalEdit: boolean;
  handleCloseModal: (type: string) => void;
  productId: string;
}

const EditItem: FC<EditItemProps> = ({
  openModalEdit,
  handleCloseModal,
  productId,
}) => {
  const { message } = App.useApp();

  const [form] = Form.useForm();
  const [isValideType, setIsValideType] = useState<boolean>(false);
  const [isValideSize, setIsValideSize] = useState<boolean>(false);
  const [productImage, setProductImage] = useState<string>("");

  // Fetch categories
  const { data: categories } = useGetCategoriesQuery(null);

  // Get product by id
  const { data: product, isLoading: isGetProductLoading } =
    useGetProductByIdQuery(productId);

  useEffect(() => {
    if (product && openModalEdit) {
      setProductImage(product?.image?.url);
      form.setFieldsValue({
        title: product.title,
        description: product.description,
        price: product.price,
        options: product.options,
        category: product.category,
      });
    }
  }, [openModalEdit, product, form]);

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
          setProductImage("");
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

  // handle update product
  const [updateProduct, { isLoading, isSuccess, isError }] =
    useUpdateProductMutation();

  const onFinish = async (values: Product) => {
    try {
      if (isValideSize) {
        return message.error("Image must smaller than 2MB!");
      }
      if (isValideType) {
        return message.error("You can only upload JPG/PNG file!");
      }

      await updateProduct({ values, productId }).unwrap();
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Product updated successfully");
      handleCloseModal("edit");
      form.resetFields();
    }
    if (isError) {
      message.success("Something went error");
    }
  }, [isSuccess]);

  return (
    <Modal
      title="Edit Product"
      centered
      open={openModalEdit}
      onOk={() => handleCloseModal("edit")}
      onCancel={() => handleCloseModal("edit")}
      width={1000}
      footer={[]}
      forceRender
    >
      <div className="p-4">
        <Form
          form={form}
          name="edit-product"
          onFinish={onFinish}
          className="w-full"
          scrollToFirstError
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          size={"large" as SizeType}
          initialValues={{
            price: 0,
            image: null,
          }}
          preserve={false}
        >
          <div className="mb-4">
            <Form.Item
              name="image"
              rules={[
                {
                  required: productImage ? false : true,
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
            {productImage && (
              <Image
                width={80}
                height={80}
                className="mt-4 overflow-hidden rounded-lg"
                alt="product-image"
                src={productImage}
              />
            )}
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
              <Input.TextArea showCount maxLength={100} />
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
            <label className="text-dark">Options List</label>

            <Form.List name="options" initialValue={product?.options}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div
                      key={field.key}
                      className="mt-2 flex items-center gap-2"
                    >
                      <Form.Item
                        {...field}
                        key={field.key}
                        className="w-full mb-0"
                      >
                        <Input className="w-full" />
                      </Form.Item>

                      <div
                        className="bg-brand cursor-pointer w-8 h-8 rounded-lg text-white flex items-center justify-center"
                        onClick={() => remove(field.name)}
                      >
                        <MinusCircleOutlined />
                      </div>
                    </div>
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
                    <span>Edit</span>
                  </>
                ) : (
                  <span>Edit</span>
                )}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="button"
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

export default EditItem;
