"use client";

import { Loader } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import Button from "../ui/Button";
import { BiCopyAlt } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import generator from "generate-password";
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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { RcFile } from "antd/es/upload/interface";

const { Option } = Select;

type SizeType = Parameters<typeof Form>[0]["size"];

interface AddUserProps {
  openModalAdd: boolean;
  handleCloseModal: (type: string) => void;
}

const AddUser: FC<AddUserProps> = ({ openModalAdd, handleCloseModal }) => {
  const [form] = Form.useForm();
  const [copyPwd, setCopyPwd] = useState<string>("");
  const [isValideType, setIsValideType] = useState<boolean>(false);
  const [isValideSize, setIsValideSize] = useState<boolean>(false);

  // Generate password
  const generatePwd = () => {
    const pwd = generator.generate({
      length: 8,
      numbers: true,
    });

    form.setFieldsValue({
      password: pwd,
    });

    setCopyPwd(pwd);

    message.success("Password generated successfully");
  };

  // Copy password
  const copyGeneratedPwd = async () => {
    await navigator.clipboard.writeText(copyPwd);
    message.success("Password copied successfully");
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
  const [addNewUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();

  const onFinish = async (values: any) => {
    try {
      if (isValideSize) {
        return message.error("Image must smaller than 2MB!");
      }

      if (isValideType) {
        return message.error("You can only upload JPG/PNG file!");
      }

      await addNewUser(values).unwrap();
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("User added successfully");
      handleCloseModal("add");
      form.resetFields();
    }
  }, [isSuccess]);

  return (
    <Modal
      title="Add New User"
      centered
      open={openModalAdd}
      onOk={() => handleCloseModal("add")}
      onCancel={() => handleCloseModal("add")}
      width={1000}
      footer={[]}
    >
      <div className="p-4">
        <Form
          form={form}
          name="add-new-user"
          onFinish={onFinish}
          className="w-full"
          scrollToFirstError
          layout="vertical"
          autoComplete="off"
          requiredMark={false}
          size={"large" as SizeType}
          initialValues={{ password: "" }}
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
                // fileList={fileList}
                name="image"
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

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "First Name is required!",
                  },
                ]}
                className="py-4"
              >
                <Input className="w-full py-4" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Last Name is required!" }]}
              >
                <Input className="w-full" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "E-mail is not valid!",
              },
              {
                required: true,
                message: "E-mail is required!",
              },
            ]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Address is required!" }]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Phone number is required!" },
                ]}
              >
                <Input className="w-full" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: "Role is required!" }]}
              >
                <Select placeholder="select role">
                  <Option value="admin">Admin</Option>
                  <Option value="cashier">Cashier</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-light/20 border border-gray-light/40 rounded-xl p-4">
            <Form.Item
              name="password"
              label="Genrate Password"
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
              ]}
            >
              <Input.Password disabled={true} />
            </Form.Item>

            <div className="flex items-end gap-2 my-auto">
              <Button
                variant="default"
                size="sm"
                rounded="full"
                onClick={generatePwd}
                type="button"
                className="gap-1"
              >
                Generate
                <LuSettings2 size={17} />
              </Button>
              {Form.useWatch("password", form) === "" ? (
                <Button
                  variant="disabled"
                  size="sm"
                  rounded="full"
                  disabled
                  type="button"
                  className="gap-1"
                >
                  copy <BiCopyAlt />
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  rounded="full"
                  onClick={copyGeneratedPwd}
                  type="button"
                  className="gap-1"
                >
                  copy <BiCopyAlt />
                </Button>
              )}
            </div>
          </div>

          <Row gutter={16}>
            <Col span={12}>
              {isLoading ? (
                <Button
                  variant="disabled"
                  size="default"
                  rounded="full"
                  className="gap-2"
                >
                  Add <Loader color="#073b4c" size="xs" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="default"
                  rounded="full"
                  // htmlType="submit"
                >
                  Add
                </Button>
              )}
            </Col>
            <Col span={12}>
              {" "}
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

export default AddUser;
