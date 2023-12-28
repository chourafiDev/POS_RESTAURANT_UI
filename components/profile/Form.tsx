"use client";

import SpinLoading from "@/components/ui/SpinLoading";
import { FC, useEffect } from "react";
import Button from "@/components/ui/Button";
import { Form as AntdForm, Input, Select, Row, Col, message } from "antd";
import { motion } from "framer-motion";
import { useUpdateCurrentUserMutation } from "@/redux/services/profileApiSlice";
import { User } from "../../../types";

type SizeType = Parameters<typeof AntdForm>[0]["size"];

interface FormProps {
  id: string;
  active: boolean;
  user: User;
}

const Form: FC<FormProps> = ({ id, active, user }) => {
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

  const [form] = AntdForm.useForm();

  // Display user data in form inputs

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        phone: user.phone,
      });
    }
  }, [user, form]);

  // handle update user data
  const [updateProfile, { isLoading, isSuccess, isError }] =
    useUpdateCurrentUserMutation();

  const onFinish = async (values: any) => {
    try {
      const res = await updateProfile(values).unwrap();
      message.success(res.message);
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  return (
    <motion.div
      variants={tabContentVariant}
      animate={active ? "active" : "inactive"}
      initial="inactive"
      className="form bg-white rounded-xl p-6"
    >
      <h1 className="text-dark font-medium mb-5 text-[17px]">
        Personal Information
      </h1>

      <AntdForm
        form={form}
        name="change-user-info"
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
        <Row gutter={16}>
          <Col span={12}>
            <AntdForm.Item
              name="firstName"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "First Name is required!",
                },
              ]}
            >
              <Input className="w-full" />
            </AntdForm.Item>
          </Col>
          <Col span={12}>
            <AntdForm.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: "Last Name is required!" }]}
            >
              <Input className="w-full" />
            </AntdForm.Item>
          </Col>
        </Row>

        <AntdForm.Item
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
        </AntdForm.Item>

        <AntdForm.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Address is required!" }]}
        >
          <Input.TextArea showCount maxLength={100} />
        </AntdForm.Item>

        <AntdForm.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Phone number is required!",
            },
            {
              message: "Phone number is not valide",
              validator: (_, value) => {
                if (/^(06|07|05)\d{8}$/.test(value)) {
                  return Promise.resolve();
                } else {
                  return Promise.reject("Phone number is not valide");
                }
              },
            },
          ]}
        >
          <Input className="w-full" />
        </AntdForm.Item>

        <div className="flex justify-end w-full">
          <Button
            variant="default"
            size="default"
            rounded="full"
            disabled={isLoading}
            className="gap-2 w-1/2"
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
        </div>
      </AntdForm>
    </motion.div>
  );
};

export default Form;
