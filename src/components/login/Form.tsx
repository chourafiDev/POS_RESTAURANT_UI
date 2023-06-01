"use client";

import { Input, PasswordInput, Checkbox, Divider } from "@mantine/core";
import Link from "next/link";
import { TfiLock, TfiEmail } from "react-icons/tfi";
import Button from "../ui/Button";
import Image from "next/image";

const Form = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-3/4">
        <div className="w-[70px] h-[70px] rounded-full border border-gray-light bg-gray-light/20 relative mb-6">
          <Image
            src="/assets/imgs/logo-icon.png"
            fill
            alt="logo"
            className="p-3"
          />
        </div>

        <div className="mb-9">
          <h1 className="text-dark/80 font-semibold text-2xl mb-2">
            Hello Again 👋
          </h1>
          <p className="text-sm text-gray/90 font-normal leading-relaxed tracking-wide	">
            Enter your information to get access to the app.
          </p>
        </div>

        <form className="">
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

          <div className="space-y-4">
            <Button variant="default" size="default">
              Login
            </Button>

            <Divider my="xs" label="or" labelPosition="center" />

            <Button variant="outline" size="default" className="gap-3">
              <Image
                src="/assets/imgs/icons/google.png"
                alt="google"
                width={18}
                height={18}
              />
              Sign In With Google
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
