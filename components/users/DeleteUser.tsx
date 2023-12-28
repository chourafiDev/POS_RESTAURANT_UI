"use client";

import { FC, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import Button from "../ui/Button";
import { Modal, message } from "antd";
import { useDeleteUserMutation } from "@/redux/services/userApiSlice";
import SpinLoading from "@/components/ui/SpinLoading";

interface DeleteUserProps {
  openModalDelete: boolean;
  handleCloseModal: (type: string) => void;
  userId: string;
}

const DeleteUser: FC<DeleteUserProps> = ({
  openModalDelete,
  handleCloseModal,
  userId,
}) => {
  const [deleteUser, { isLoading, isSuccess, isError }] =
    useDeleteUserMutation();

  const deleteUserById = async () => {
    try {
      await deleteUser(userId);
    } catch (err: any) {
      message.success(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("User deleted successfully");
      handleCloseModal("delete");
    }
  }, [isSuccess]);

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
      <div className="bg-gray-light/30 px-24 py-8 border-t border-gray/20">
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
          <Button
            onClick={deleteUserById}
            variant="destructive"
            size="default"
            rounded="default"
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <SpinLoading color="#ffffff" />
                <span>Yes, Delete User</span>
              </>
            ) : (
              <span>Yes, Delete User</span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUser;
