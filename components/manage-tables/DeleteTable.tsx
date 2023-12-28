"use client";

import { FC, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import Button from "@/components/ui/Button";
import { Modal, message } from "antd";
import SpinLoading from "@/components/ui/SpinLoading";
import { useDeleteTableMutation } from "@/redux/services/tableApiSlice";

interface DeleteTableProps {
  openModalDelete: boolean;
  handleCloseModal: (type: string) => void;
  tableId: string | undefined;
}

const DeleteTable: FC<DeleteTableProps> = ({
  openModalDelete,
  handleCloseModal,
  tableId,
}) => {
  const [deleteTable, { isLoading, isSuccess }] = useDeleteTableMutation();

  const deleteTbaleById = async () => {
    try {
      await deleteTable(tableId);
    } catch (err: any) {
      message.success(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      message.success("Table deleted successfully");
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
          Delete table
        </h2>
      </div>
      <div className="bg-gray-light/30 px-20 py-8 border-t border-gray/20">
        <p className="text-dark/80 mb-5 font-medium text-[15px] leading-6">
          Deleting a table will permanently remove it from your application
        </p>

        <div className="flex items-center gap-3">
          <Button
            variant="outline-gray"
            size="default"
            rounded="default"
            className="bg-white"
            onClick={() => handleCloseModal("delete")}
          >
            No, Keep Table
          </Button>
          <Button
            onClick={deleteTbaleById}
            variant="destructive"
            size="default"
            rounded="default"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <SpinLoading color="#ffffff" />
                <span>Yes, Delete Table</span>
              </>
            ) : (
              <span>Yes, Delete Table</span>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTable;
