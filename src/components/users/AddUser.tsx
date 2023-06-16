"use client";

import { Input, Modal, useMantineTheme } from "@mantine/core";
import { FC, useState } from "react";
import Button from "../ui/Button";
import { FileInput, rem } from "@mantine/core";
import { FiUpload } from "react-icons/fi";

interface DeleteUserProps {
  modalAddOpened: boolean;
  closeModalAdd: () => void;
}

const AddUser: FC<DeleteUserProps> = ({ modalAddOpened, closeModalAdd }) => {
  const theme = useMantineTheme();

  //   form states
  const [image, setImage] = useState<File | null>(null);

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
          <Button variant="default" size="default" rounded="full">
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUser;
