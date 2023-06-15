"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import { Input, PasswordInput } from "@mantine/core";
import Button from "../ui/Button";

interface FormProps {
  id: string;
  active: boolean;
}

const Password: FC<FormProps> = ({ id, active }) => {
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
  return (
    <motion.div
      variants={tabContentVariant}
      animate={active ? "active" : "inactive"}
      initial="inactive"
      className="form bg-white rounded-xl p-6"
    >
      <h1 className="text-dark font-bold text-[18px]">Login & Password</h1>
      <p className="text-dark/70 font-medium text-[15px] mt-2">
        Entre the details to change your password
      </p>
      <form className="mt-10">
        <PasswordInput label="Current Password" className="mt-6" />
        <PasswordInput label="New Password" className="mt-6" />
        <PasswordInput label="Confirm Password" className="mt-6" />

        <div className="flex items-center gap-4 mt-10">
          <Button variant="outline" size="default" rounded="full">
            Discard Changes
          </Button>
          <Button variant="default" size="default" rounded="full">
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Password;
