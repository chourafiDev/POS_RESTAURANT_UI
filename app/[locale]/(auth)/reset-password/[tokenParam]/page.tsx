"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import { message } from "antd";
import { Form as FormAntd, Input } from "antd";
import { useResetPasswordMutation } from "@/redux/services/authApiSlice";
import SpinLoading from "@/components/ui/SpinLoading";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const ResetPassword = ({
  params: { tokenParam },
}: {
  params: { tokenParam: string };
}) => {
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
    <div className="h-screen bg-[#fafafa] flex flex-col justify-center items-center">
      <div className="w-[40%] bg-white p-8 rounded-xl shadow-2xl shadow-gray-light/50">
        <div className="w-[70px] h-[70px] rounded-full border border-gray-light bg-dark relative mb-6">
          <Image src="/assets/imgs/logo.svg" fill alt="logo" className="p-2" />
        </div>

        <div className="mb-5">
          <h1 className="text-dark/80 font-semibold text-2xl mb-2">
            Reset Password
          </h1>
          <p className="text-[16px] text-gray/90 font-normal leading-relaxed tracking-wide	">
            Enter the information below to reset your password
          </p>
        </div>

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
      </div>
    </div>
  );
};

export default ResetPassword;
