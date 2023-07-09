"use client";

import { Loader } from "@mantine/core";
import React, { FC, useEffect, useState, useRef } from "react";
import Button from "@/components/ui/Button";
import { BiCopyAlt } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import { useCreateUserMutation } from "@/redux/services/userApiSlice";
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Upload,
  Button as UploadButton,
  message,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { burger } from "@/utils/assets";
import Image from "next/image";
import { RcFile } from "antd/es/upload";
import { categories } from "@/utils/data";

type SizeType = Parameters<typeof Form>[0]["size"];

interface AddCategoryProps {
  openModalAdd: boolean;
  handleCloseModal: (type: string) => void;
}

const { Option } = Select;

const AddCategory: FC<AddCategoryProps> = ({
  openModalAdd,
  handleCloseModal,
}) => {
  const [form] = Form.useForm();
  const [copyPwd, setCopyPwd] = useState<string>("");
  const [isValideType, setIsValideType] = useState<boolean>(false);
  const [isValideSize, setIsValideSize] = useState<boolean>(false);

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

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
      // message.error("You can only upload JPG/PNG file!");
      // return false;
      setIsValideType(true);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      // message.error("Image must smaller than 2MB!");
      // return false;
      setIsValideSize(true);
    }
    // return isJpgOrPng && isLt2M;
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

  // handle create new user
  // const [addNewUser, { isLoading, isSuccess, isError }] =
  //   useCreateUserMutation();

  // const onFinish = async (values: User) => {
  //   try {
  //     if (isValideSize) {
  //       return message.error("Image must smaller than 2MB!");
  //     }

  //     if (isValideType) {
  //       return message.error("You can only upload JPG/PNG file!");
  //     }

  //     await addNewUser(values).unwrap();
  //   } catch (err: any) {
  //     message.error(err.data?.message || err.error);
  //   }
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     message.success("User added successfully");
  //     handleCloseModal("add");
  //     form.resetFields();
  //   }
  // }, [isSuccess]);

  const iconRef = useRef();

  const handleClick = (e: any) => {
    console.log("image", iconRef?.current.value);
  };

  return (
    <Modal
      title="Add New Category"
      centered
      open={openModalAdd}
      onOk={() => handleCloseModal("add")}
      onCancel={() => handleCloseModal("add")}
      width={700}
      footer={[]}
    >
      <div className="p-4">
        <Form
          form={form}
          name="add-new-user"
          // onFinish={onFinish}
          className="w-full"
          scrollToFirstError
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          size={"large" as SizeType}
          initialValues={{ password: "" }}
          preserve={false}
        >
          <Image src={burger} width="40" height="40" alt="test" />
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Name is required!",
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            name="icon"
            label="Icon"
            rules={[
              {
                required: true,
                message: "Icon is required!",
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              defaultValue={["china"]}
              onChange={handleChange}
              optionLabelProp="label"
            >
              {categories.map(({ id, name, icon }) => (
                <Option key={id} value={name} label={name}>
                  <Space>
                    <Image src={icon} alt={name} width={20} height={20} />
                    {name}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Space>
            {categories.map(({ id, name, icon }, i) => (
              <Space key={id} onClick={handleClick}>
                <Image
                  src={icon}
                  ref={iconRef[i]}
                  alt={name}
                  width={20}
                  height={20}
                />
                {name}
              </Space>
            ))}
          </Space>

          <Row gutter={16}>
            <Col span={12}>
              <Button
                variant="default"
                size="default"
                rounded="full"
                // disabled={isLoading}
                className="gap-2"
              >
                add
                {/* {isLoading ? (
                  <>
                    <Loader color="#ffffff" size="xs" />
                    <span>Add</span>
                  </>
                ) : (
                  <span>Add</span>
                )} */}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                key="back"
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

export default AddCategory;
