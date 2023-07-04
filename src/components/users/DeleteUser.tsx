"use client";

import { FC } from "react";
import { BsTrash } from "react-icons/bs";
import Button from "../ui/Button";
import { Modal } from "antd";

interface DeleteUserProps {
  openModalDelete: boolean;
  handleCloseModal: (type: string) => void;
}

const DeleteUser: FC<DeleteUserProps> = ({
  openModalDelete,
  handleCloseModal,
}) => {
  return (
    <Modal
      title=""
      centered
      open={openModalDelete}
      onOk={() => handleCloseModal("delete")}
      onCancel={() => handleCloseModal("delete")}
      width={600}
      footer={[]}
    >
      <div className="py-8">
        <BsTrash className="mx-auto text-red mb-2" size={24} />
        <h2 className="text-red text-center font-medium text-xl">
          Delete user
        </h2>
      </div>
      <div className="bg-gray-light/30 px-28 py-8 border-t border-gray/20">
        <p className="text-dark/80 mb-5 font-medium text-[15px] leading-6">
          Deleting a user will permanently remove it from your application
        </p>

        <div className="flex items-center gap-3">
          <Button
            variant="outline-gray"
            size="default"
            rounded="default"
            className="bg-white"
            onClick={() => handleCloseModal("delete")}
          >
            No, Keep User
          </Button>
          <Button variant="destructive" size="default" rounded="default">
            Yes, Delete User
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUser;
