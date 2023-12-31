"use client";

import SpinLoading from "@/components/ui/SpinLoading";
import { Form as FormAntd, Input } from "antd";
import Button from "@/components/ui/Button";
import { message } from "antd";
import { useResetPasswordMutation } from "@/redux/services/authApiSlice";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ResetPasswordForm = ({ tokenParam }: { tokenParam: string }) => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // handle reset password
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

  const submitHandler = async ({ password }: { password: string }) => {
    try {
      await resetPassword({ password, tokenParam }).unwrap();
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Password reset successfully");
      redirect("/en/login");
    }
  }, [isSuccess]);

  return (
    <FormAntd
      name="reset-password"
      onFinish={submitHandler}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      initialValues={{ email }}
    >
      <FormAntd.Item label="Email" name="email" className="mb-4">
        <Input className="py-2 bg-gray-light/80" disabled />
      </FormAntd.Item>

      <FormAntd.Item
        label="Enter your new password"
        name="password"
        rules={[
          {
            required: true,
            message: "Password is required!",
          },
        ]}
        className="mb-4"
      >
        <Input.Password placeholder="New password" className="py-2" />
      </FormAntd.Item>

      <FormAntd.Item
        label="Enter your confirm password"
        name="confirm-password"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Confirm password is required!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The new password that you entered do not match!")
              );
            },
          }),
        ]}
        className="mb-4"
      >
        <Input.Password placeholder="Confirm password" className="py-2" />
      </FormAntd.Item>

      <FormAntd.Item className="mt-4">
        <Button
          variant="default"
          size="default"
          rounded="default"
          disabled={isLoading}
          className="gap-2"
        >
          {isLoading ? (
            <>
              <SpinLoading color="#264653" />
              <span>Save password</span>
            </>
          ) : (
            <span>Save password</span>
          )}
        </Button>
      </FormAntd.Item>
    </FormAntd>
  );
};

export default ResetPasswordForm;
