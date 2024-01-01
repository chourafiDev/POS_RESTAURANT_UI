"use client";

import SpinLoading from "@/components/ui/SpinLoading";
import { Form as FormAntd, Input } from "antd";
import { Col, Row, message } from "antd";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useForgotPasswordMutation } from "@/redux/services/authApiSlice";

const ForgotPasswordForm = ({ locale }: { locale: string }) => {
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
            <Link href={`/${locale}/login`}>Back to Login</Link>
          </Button>
        </Col>
      </Row>
    </FormAntd>
  );
};

export default ForgotPasswordForm;
