"use client";

import { Input, Modal, Select, useMantineTheme } from "@mantine/core";
import { FC, useState } from "react";
import Button from "../ui/Button";
import { FileInput, rem } from "@mantine/core";
import { FiUpload } from "react-icons/fi";
import { BiCopyAlt } from "react-icons/bi";
import { LuSettings2 } from "react-icons/lu";
import generator from "generate-password";
import { toast } from "react-hot-toast";

interface DeleteUserProps {
  modalAddOpened: boolean;
  closeModalAdd: () => void;
}

const AddUser: FC<DeleteUserProps> = ({ modalAddOpened, closeModalAdd }) => {
  const theme = useMantineTheme();

  //   form states
  const [generatePassword, setGeneratePassword] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  // Generate password
  const generatePwd = () => {
    const pwd = generator.generate({
      length: 8,
      numbers: true,
    });
    setGeneratePassword(pwd);
  };

  // Copy password
  const copyPwd = async () => {
    await navigator.clipboard.writeText(generatePassword);
    toast.success("Mot de passe copié");
  };

  return (
    <Modal
      opened={modalAddOpened}
      onClose={closeModalAdd}
      withCloseButton={true}
      centered
      title="Add User"
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      size="xl"
    >
      <form className="mt-6 px-7 pb-7 form">
        <FileInput
          label="Upload Image"
          placeholder="choose image"
          icon={<FiUpload size={rem(14)} />}
        />
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
          <Select
            label="Role"
            placeholder="Role"
            data={[
              { value: "Admin", label: "Admin" },
              { value: "Cashier", label: "Cashier" },
            ]}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 bg-gray-light/20 border border-gray-light/40 rounded-xl p-4">
          <Input.Wrapper id="password" className="" label="Generate Password">
            <Input id="password" disabled value={generatePassword} />
          </Input.Wrapper>
          <div className="flex items-end gap-2">
            <Button
              variant="default"
              size="sm"
              rounded="full"
              onClick={generatePwd}
              type="button"
              className="gap-1"
            >
              Generate
              <LuSettings2 size={17} />
            </Button>
            {generatePassword === "" ? (
              <Button
                variant="disabled"
                size="sm"
                rounded="full"
                disabled
                type="button"
                className="gap-1"
              >
                copy <BiCopyAlt />
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                rounded="full"
                onClick={copyPwd}
                type="button"
                className="gap-1"
              >
                copy <BiCopyAlt />
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-10">
          <Button variant="default" size="default" rounded="full">
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUser;
