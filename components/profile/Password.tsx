"use client";

import SpinLoading from "@/components/ui/SpinLoading";
import { FC } from "react";
import Button from "@/components/ui/Button";
import { Form, Input, Select, Row, Col } from "antd";
import { motion } from "framer-motion";
import { User } from "../../../types";

type SizeType = Parameters<typeof Form>[0]["size"];

interface FormProps {
  id: string;
  active: boolean;
  user: User;
}

const Password: FC<FormProps> = ({ id, active, user }) => {
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

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    // try {
    //   if (isValideSize) {
    //     return message.error("Image must smaller than 2MB!");
    //   }
    //   if (isValideType) {
    //     return message.error("You can only upload JPG/PNG file!");
    //   }
    //   await addNewProduct(values).unwrap();
    // } catch (err: any) {
    //   message.error(err.data?.message || err.error);
    // }
  };
  return (
    <motion.div
      variants={tabContentVariant}
      animate={active ? "active" : "inactive"}
      initial="inactive"
      className="form bg-white rounded-xl p-6"
    >
      <h1 className="text-dark font-medium mb-2 text-[17px]">
        Login & Password
      </h1>
      <p className="text-dark/60 font-normal text-[15px]">
        Enter the details below to change your password
      </p>
      <Form
        form={form}
        name="add-new-user"
        onFinish={onFinish}
        className="w-full mt-8"
        scrollToFirstError
        layout="vertical"
        autoComplete="off"
        requiredMark={false}
        size={"large" as SizeType}
        initialValues={{ password: "" }}
        preserve={false}
      >
        <Form.Item
          name="currentPassword"
          label="Current Password"
          rules={[
            {
              required: true,
              message: "Current password is required!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="New Password"
          rules={[
            {
              required: true,
              message: "New Password is required!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          rules={[
            {
              required: true,
              message: "Confirm Password is required!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className="flex justify-end w-full">
          <Button
            variant="default"
            size="default"
            rounded="full"
            // disabled={isLoading}
            className="gap-2 w-1/2"
          >
            {/* {!isLoading ? (
                  <>
                    <SpinLoading color="#264653" />
                    <span>Add</span>
                  </>
                ) : (
                  <span>Add</span>
                )} */}
            Edit
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};

export default Password;
