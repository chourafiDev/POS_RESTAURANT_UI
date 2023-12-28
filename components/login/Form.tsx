"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/services/authApiSlice";
import { setCredentials } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { Form as FormAntd, Input } from "antd";
import SpinLoading from "@/components/ui/SpinLoading";

interface FormProps {
  locale: string;
}

const Form = ({ locale }: FormProps) => {
  const { _id, firstName, lastName, role } = useAppSelector(
    (state) => state.auth
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  const submitHandler = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) router.push(`/${locale}/dashboard`);
  }, [isSuccess, router]);

  return (
    <div className="h-screen bg-white flex flex-col justify-center items-center">
      <div className="w-3/4">
        <div className="w-[70px] h-[70px] rounded-full border border-gray-light bg-dark relative mb-6">
          <Image src="/assets/imgs/logo.svg" fill alt="logo" className="p-2" />
        </div>

        <div className="mb-9">
          <h1 className="text-dark/80 font-semibold text-2xl mb-2">
            Welcome Back 👋
          </h1>
          <p className="text-[15px] text-gray/90 font-normal leading-relaxed tracking-wide	">
            Enter your information to get access to the app.
          </p>
        </div>

        <FormAntd
          name="login"
          onFinish={submitHandler}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <FormAntd.Item
            label="Email"
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
            className="mb-2"
          >
            <Input placeholder="Your email" className="py-2" />
          </FormAntd.Item>

          <FormAntd.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required!" }]}
            className="mb-1"
          >
            <Input.Password placeholder="Your password" className="py-2" />
          </FormAntd.Item>

          <div className="flex justify-end">
            <Link
              href={`/${locale}/forgot-password`}
              className="text-dark/80 text-sm font-medium hover:text-brand duration-200 ease-in mt-1"
            >
              Forgot Password
            </Link>
          </div>

          <FormAntd.Item className="mt-8">
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
                  <span>Login</span>
                </>
              ) : (
                <span>Login</span>
              )}
            </Button>
          </FormAntd.Item>
        </FormAntd>

        <p className="text-dark/40 text-[13px] font-semibold text-center mt-10">
          &copy; {new Date().getFullYear()} ALL RIGHT RESERVED
        </p>
      </div>
    </div>
  );
};

export default Form;
