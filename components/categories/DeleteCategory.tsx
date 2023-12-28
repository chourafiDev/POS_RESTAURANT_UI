"use client";

import { FC, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import Button from "@/components/ui/Button";
import { Modal, message } from "antd";
import { useDeleteCategoryMutation } from "@/redux/services/categoryApiSlice";
import SpinLoading from "@/components/ui/SpinLoading";

interface DeleteCategoryProps {
  openModalDelete: boolean;
  handleCloseModal: (type: string) => void;
  categoryId: string;
}

const DeleteCategory: FC<DeleteCategoryProps> = ({
  openModalDelete,
  handleCloseModal,
  categoryId,
}) => {
  const [deleteCategory, { isLoading, isSuccess, isError }] =
    useDeleteCategoryMutation();

  const deleteUserById = async () => {
    try {
      await deleteCategory(categoryId);
    } catch (err: any) {
      message.success(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Category deleted successfully");
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
          Delete category
        </h2>
      </div>
      <div className="bg-gray-light/30 px-16 py-8 border-t border-gray/20">
        <p className="text-dark/80 mb-5 font-medium text-[15px] leading-6">
          Deleting a category will permanently remove it from your application
        </p>

        <div className="flex items-center gap-3">
          <Button
            variant="outline-gray"
            size="default"
            rounded="default"
            className="bg-white"
            onClick={() => handleCloseModal("delete")}
          >
            No, Keep Category
          </Button>
          <Button
            onClick={deleteUserById}
            variant="destructive"
            size="default"
            rounded="default"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <SpinLoading color="#ffffff" />
                <span>Yes, Delete Category</span>
              </>
            ) : (
              <span>Yes, Delete Category</span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteCategory;
