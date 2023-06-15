"use client";

import { Group, Input, Radio } from "@mantine/core";
import { FC } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

interface FormProps {
  id: string;
  active: boolean;
}

const Form: FC<FormProps> = ({ id, active }) => {
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
      <h1 className="text-dark font-bold text-[15px]">Personal Information</h1>
      <form className="mt-10">
        <Radio.Group name="gender" withAsterisk>
          <Group mt="xs">
            <Radio value="male" label="Male" color="teal" />
            <Radio value="female" label="Female" color="teal" />
          </Group>
        </Radio.Group>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Input.Wrapper id="firstName" label="First Name">
            <Input id="firstName" />
          </Input.Wrapper>
          <Input.Wrapper id="lastName" label="Last Name">
            <Input id="lastName" />
          </Input.Wrapper>
        </div>
        <Input.Wrapper id="email" label="Eamil" className="mt-6">
          <Input id="email" />
        </Input.Wrapper>
        <Input.Wrapper id="adrress" label="Address" className="mt-6">
          <Input id="adrress" />
        </Input.Wrapper>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Input.Wrapper id="phone-number" label="Phone">
            <Input id="phone-number" />
          </Input.Wrapper>
          <Input.Wrapper id="dateOfBirth" label="Date of Birth">
            <Input id="dateOfBirth" />
          </Input.Wrapper>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Input.Wrapper id="location" label="Location">
            <Input id="location" />
          </Input.Wrapper>
          <Input.Wrapper id="postalCode" label="Postal Code">
            <Input id="postalCode" />
          </Input.Wrapper>
        </div>

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

export default Form;
