"use client";

import { Input, PasswordInput, Checkbox, Divider, Loader } from "@mantine/core";
import Link from "next/link";
import { TfiLock, TfiEmail } from "react-icons/tfi";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { FormEvent, useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/services/authApiSlice";
import { setCredentials } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { message } from "antd";

const Form = () => {
  const { _id, firstName, lastName, role } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (_id !== "" && firstName !== "" && lastName !== "" && role !== "") {
      router.push("/");
    }
  }, [_id, firstName, lastName, role, router]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push("/");
    } catch (err: any) {
      message.error(err.data?.message || err.error);
    }
  };

  return (
    <div className="h-screen bg-[#fafafa] flex flex-col justify-center items-center">
      <div className="w-3/4">
        <div className="w-[70px] h-[70px] rounded-full border border-gray-light bg-gray-light/20 relative mb-6">
          <Image src="/assets/imgs/logo.svg" fill alt="logo" className="p-3" />
        </div>

        <div className="mb-9">
          <h1 className="text-dark/80 font-semibold text-2xl mb-2">
            Hello Again 👋
          </h1>
          <p className="text-sm text-gray/90 font-normal leading-relaxed tracking-wide	">
            Enter your information to get access to the app.
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="space-y-3">
            <Input
              icon={<TfiEmail />}
              placeholder="Your email"
              styles={() => ({
                input: {
                  "&:focus-within": {
                    borderColor: "#46A094",
                  },
                  color: "#817d7d",
                },
              })}
              size="md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              placeholder="Your password"
              icon={<TfiLock size="1rem" />}
              styles={() => ({
                input: {
                  "&:focus-within": {
                    borderColor: "#46A094",
                  },
                },
              })}
              size="md"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center mb-10 mt-2">
            <Checkbox label="Remember me" color="teal" />
            <Link
              href="/"
              className="text-dark text-sm font-medium hover:text-brand duration-200 ease-in "
            >
              Recovery Password
            </Link>
          </div>

          {isLoading ? (
            <Button
              variant="disabled"
              size="default"
              rounded="default"
              className="flex items-center gap-2"
            >
              Login <Loader color="#073b4c" size="xs" />
            </Button>
          ) : (
            <Button variant="default" size="default" rounded="default">
              Login
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
