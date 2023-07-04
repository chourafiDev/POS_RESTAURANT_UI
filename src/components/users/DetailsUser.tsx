"use client";

// import { Input, Modal, useMantineTheme } from "@mantine/core";
import { FC, useState } from "react";
import Button from "../ui/Button";
import { FileInput, rem } from "@mantine/core";
import { FiUpload } from "react-icons/fi";
import Image from "next/image";
import { Modal } from "antd";

interface DetailsUserProps {
  openModalDetail: boolean;
  handleCloseModal: (type: string) => void;
}

const DetailsUser: FC<DetailsUserProps> = ({
  openModalDetail,
  handleCloseModal,
}) => {
  return (
    <Modal
      title=""
      centered
      open={openModalDetail}
      onOk={() => handleCloseModal("detail")}
      onCancel={() => handleCloseModal("detail")}
      width={800}
      footer={[]}
    >
      <div className="p-4">
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
      </div>
    </Modal>
  );
};

export default DetailsUser;
