"use client";

import {
  // Input,
  Loader,
  // Modal,
  // PasswordInput,
  // useMantineTheme,
} from "@mantine/core";
import { FC, useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
// import { FileInput, rem } from "@mantine/core";
import { FiUpload } from "react-icons/fi";
// import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiCopyAlt } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import generator from "generate-password";
// import { Field, Formik, useFormik } from "formik";
import * as Yup from "yup";
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
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { toastMessage } from "@/utils/toastMessage";

const { Option } = Select;

interface AddUserProps {
  openModalAdd: boolean;
  handleCloseModal: (type: string) => void;
}

// Initial values
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
  phone: "",
  role: "",
  password: "",
  address: "",
};

const validFileExtensions = ["jpg", "png", "jpeg"];

const AddUser: FC<AddUserProps> = ({ openModalAdd, handleCloseModal }) => {
  // const theme = useMantineTheme();
  const fileRef = useRef<HTMLInputElement>(null);
  const [imagePrev, setImagePrev] = useState<string>("");

  //Validation schema with YUP
  const phoneRegExp = /^(0)\d{9}$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("This field is required!"),
    lastName: Yup.string().required("This field is required!"),
    email: Yup.string()
      .required("This field is required!")
      .email("Invalide Email Address!"),
    role: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
    address: Yup.string().required("This field is required!"),
    phone: Yup.string()
      .required("This field is required!")
      .matches(phoneRegExp, "Invalid mobile phone"),
    image: Yup.mixed()
      .required("This field is required!")
      .test(
        "is-file-of-correct-type",
        "Invalid type of file, accept (png, jpg, jpeg)",
        isValidFileType
      )
      .test(
        "is-file-too-big",
        "The maximum size allowed is less than 5MB",
        isValidFileSize
      ),
  });

  // Check type extension of CV file
  function isValidFileType() {
    let valid = true;

    const file = fileRef.current?.files?.[0] as File;
    console.log("file", file);
    if (file) {
      const type = file.type.split("/")[1];

      if (!validFileExtensions.includes(type)) {
        valid = false;
      }
    }

    return valid;
  }

  // Check size of CV file
  function isValidFileSize() {
    let valid = true;
    const file = fileRef.current?.files?.[0] as File;
    const size = file.size / (1024 * 1024); //3MB

    if (size > 3) {
      valid = false;
    }

    return valid;
  }

  // handle click file upload
  const handleClickFile = () => {
    fileRef.current?.click();
  };

  // Convert CV file to base64
  function convertToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const base64String = fileReader.result;
        // const base64String = fileReader?.result?.split(",")[1];
        resolve(base64String);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  // Generate password
  const generatePwd = (formik: any) => {
    const password = generator.generate({
      length: 8,
      numbers: true,
    });
    formik.setFieldValue("password", password);
  };

  // Copy password
  const copyPwd = async (formik: any) => {
    // await navigator.clipboard.writeText(formik.values.password);
    toastMessage("success", "Password copied successfully");
  };

  // handle create new user
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const [addNewUser, { isLoading, isSuccess, isError }] =
    useCreateUserMutation();

  const submiteHundler = async (values: any) => {
    console.log("values", values);

    try {
      await addNewUser(values);
    } catch (err: any) {
      console.log("errrror", err.data?.message || err.error);
      // toast.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      // toast.success("User added successfully");
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
      footer={
        [
          // <div key="add">
          //   {isLoading ? (
          //     <Button
          //       variant="disabled"
          //       size="default"
          //       rounded="full"
          //       className="gap-2"
          //     >
          //       Add <Loader color="#073b4c" size="xs" />
          //     </Button>
          //   ) : (
          //     <Button
          //       variant="default"
          //       size="default"
          //       rounded="full"
          //       htmlType="submit"
          //     >
          //       Add
          //     </Button>
          //   )}
          // </div>,
          // <Button
          //   key="back"
          //   variant="outline"
          //   size="default"
          //   rounded="full"
          //   className="gap-2"
          //   onClick={() => handleCloseModal("add")}
          // >
          //   Cancel
          // </Button>,
          // <Button
          //   key="submit"
          //   type="primary"
          //   loading={loading}
          //   onClick={handleOk}
          // >
          //   Submit
          // </Button>,
          // <Button
          //   key="link"
          //   href="https://google.com"
          //   type="primary"
          //   loading={loading}
          //   onClick={handleOk}
          // >
          //   Search on Google
          // </Button>,
        ]
      }
    >
      <Form
        form={form}
        name="add-new-user"
        onFinish={onFinish}
        className="w-full"
        scrollToFirstError
        layout="vertical"
        autoComplete="off"
      >
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture"
          maxCount={1}
          className="w-full py-4"
        >
          <UploadButton icon={<UploadOutlined />}>Upload (Max: 1)</UploadButton>
        </Upload>

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
              rules={[{ required: true, message: "Phone number is required!" }]}
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

        <div className="grid grid-cols-2 gap-4 my-6 bg-gray-light/20 border border-gray-light/40 rounded-xl p-4">
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
            <Input.Password />
          </Form.Item>

          <div className="flex items-end gap-2">
            <Button
              variant="default"
              size="sm"
              rounded="full"
              // onClick={() => generatePwd(formik)}
              type="button"
              className="gap-1"
            >
              Generate
              <LuSettings2 size={17} />
            </Button>
            {/* {formik.values.password === "" ? ( */}
            {/* <Button
              variant="disabled"
              size="sm"
              rounded="full"
              disabled
              type="button"
              className="gap-1"
            >
              copy <BiCopyAlt />
            </Button>
            ) : ( */}
            <Button
              variant="default"
              size="sm"
              rounded="full"
              onClick={copyPwd}
              type="button"
              className="gap-1"
            >
              copy <BiCopyAlt />
            </Button>
            {/* )} */}
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
    </Modal>
  );
};

export default AddUser;
