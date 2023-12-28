"use client";

import { FC, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import Button from "@/components/ui/Button";
import { App, Modal } from "antd";
import SpinLoading from "@/components/ui/SpinLoading";
import { useDeleteProductMutation } from "@/redux/services/productApiSlice";

interface DeleteProductProps {
  openModalDelete: boolean;
  handleCloseModal: (type: string) => void;
  productId: string;
}

const DeleteItem: FC<DeleteProductProps> = ({
  openModalDelete,
  handleCloseModal,
  productId,
}) => {
  const { message } = App.useApp();

  const [deleteProduct, { isLoading, isSuccess, isError }] =
    useDeleteProductMutation();

  const deleteProductById = async () => {
    try {
      await deleteProduct(productId);
    } catch (err: any) {
      message.success(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Product deleted successfully");
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
          Delete product
        </h2>
      </div>
      <div className="bg-gray-light/30 px-20 py-8 border-t border-gray/20">
        <p className="text-dark/80 mb-5 font-medium text-[15px] leading-6">
          Deleting a product will permanently remove it from your application
        </p>

        <div className="flex items-center gap-3">
          <Button
            variant="outline-gray"
            size="default"
            rounded="default"
            type="button"
            className="bg-white"
            onClick={() => handleCloseModal("delete")}
          >
            No, Keep Product
          </Button>
          <Button
            onClick={deleteProductById}
            variant="destructive"
            size="default"
            rounded="default"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <SpinLoading color="#ffffff" />
                <span>Yes, Delete Product</span>
              </>
            ) : (
              <span>Yes, Delete Product</span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteItem;
