"use client";

import { Input, Modal, useMantineTheme } from "@mantine/core";
import { FC, useState } from "react";
import Button from "../ui/Button";
import { FileInput, rem } from "@mantine/core";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";

interface DetailsUserProps {
  modalDetailsOpened: boolean;
  closeModalDetails: () => void;
}

const DetailsUser: FC<DetailsUserProps> = ({
  modalDetailsOpened,
  closeModalDetails,
}) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={modalDetailsOpened}
      onClose={closeModalDetails}
      withCloseButton={true}
      centered
      title="Detail User"
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
      <form className="px-4 pb-4">
        <div className="bg-gray-light/60 rounded-md px-3 py-5 flex items-center gap-4">
          <Image
            src="/assets/imgs/user.png"
            width={60}
            height={60}
            className="rounded-full"
            alt="user"
          />

          <div>
            <h3 className="text-dark font-medium text-xl">Jhon stev</h3>
            <p className="text-dark/60">Cashier</p>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-6 gap-4">
          <div>
            <strong className="text-dark font-semibold">Emal Address</strong>
            <p className="text-dark/80 text-[15px]">jhonstev@gmail.com</p>
          </div>
          <div>
            <strong className="text-dark font-semibold">Phone Number</strong>
            <p className="text-dark/80 text-[15px]">0678987656</p>
          </div>
          <div>
            <strong className="text-dark font-semibold">Role</strong>
            <p className="text-dark/80 text-[15px]">Cashier</p>
          </div>
          <div>
            <strong className="text-dark font-semibold">Zip Code</strong>
            <p className="text-dark/80 text-[15px]">809876</p>
          </div>
          <div>
            <strong className="text-dark font-semibold">Location</strong>
            <p className="text-dark/80 text-[15px]">Location</p>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default DetailsUser;
