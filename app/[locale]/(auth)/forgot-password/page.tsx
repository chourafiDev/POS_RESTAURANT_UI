"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { Col, Row, message } from "antd";
import { Form as FormAntd, Input } from "antd";
import { useForgotPasswordMutation } from "@/redux/services/authApiSlice";
import SpinLoading from "@/components/ui/SpinLoading";

const ForgotPassword = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  // handle forgot password
  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const submitHandler = async ({ email }: { email: string }) => {
    console.log("email", email);
    try {
      const res = await forgotPassword({ email }).unwrap();
      console.log("res.message", res.message);
      message.success(res.message);
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };
  return (
    <div className="h-screen bg-[#fafafa] flex flex-col justify-center items-center">
      <div className="w-[40%] bg-white p-8 rounded-xl shadow-2xl shadow-gray-light/50">
        <div className="w-[70px] h-[70px] rounded-full border border-gray-light bg-dark relative mb-6">
          <Image src="/assets/imgs/logo.svg" fill alt="logo" className="p-2" />
        </div>

        <div className="mb-9">
          <h1 className="text-dark/80 font-semibold text-2xl mb-2">
            Forgot Password
          </h1>
          <p className="text-[16px] text-gray/90 font-normal leading-relaxed tracking-wide	">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        <FormAntd
          name="forgot-password"
          onFinish={submitHandler}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <FormAntd.Item
            label="Enter your email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "E-mail is required!",
              },
            ]}
            className="mb-4"
          >
            <Input placeholder="Your email" className="py-2" />
          </FormAntd.Item>

          <Row gutter={16} className="mt-8">
            <Col span={12}>
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
                    <span>Reset password</span>
                  </>
                ) : (
                  <span>Reset password</span>
                )}
              </Button>
            </Col>
            <Col span={12}>
              <Button
                variant="outline"
                size="default"
                rounded="default"
                className="gap-2"
                type="button"
              >
                <Link href={`${locale}/login`}>Back to Login</Link>
              </Button>
            </Col>
          </Row>
        </FormAntd>
      </div>
    </div>
  );
};

export default ForgotPassword;
