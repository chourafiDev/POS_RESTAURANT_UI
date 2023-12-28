"use client";

import { FC, useEffect } from "react";
import { BsTrash } from "react-icons/bs";
import Button from "@/components/ui/Button";
import { Modal, message } from "antd";
import {
  useDeleteHistoriesMutation,
  useDeleteHistoryMutation,
} from "@/redux/services/historyApiSlice";
import SpinLoading from "@/components/ui/SpinLoading";

interface DeleteHistoryProps {
  openModalDelete: boolean;
  handleCloseModal: () => void;
  setSelectedRows: any;
  historyId: string | undefined;
  historyIds: string[] | undefined;
  modaleDeleteType: string;
}

const DeleteHistory: FC<DeleteHistoryProps> = ({
  openModalDelete,
  handleCloseModal,
  historyId,
  historyIds,
  modaleDeleteType,
  setSelectedRows,
}) => {
  const [
    deleteHistory,
    { isLoading: isLoadingDeleteOne, isSuccess: isSuccessDeleteOne },
  ] = useDeleteHistoryMutation();
  const [
    deleteManyHistory,
    { isLoading: isLoadingDeleteMany, isSuccess: isSuccessDeleteMany },
  ] = useDeleteHistoriesMutation();

  const deleteHistoryById = async () => {
    try {
      await deleteHistory(historyId);
    } catch (err: any) {
      message.success(err.data?.message || err.error);
    }
  };

  const deleteManyHistoryById = async () => {
    try {
      await deleteManyHistory(historyIds);
    } catch (err: any) {
      message.success(err.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (isSuccessDeleteOne) {
      message.success("History deleted successfully");
      handleCloseModal();
    }

    if (isSuccessDeleteMany) {
      message.success("History deleted successfully");
      handleCloseModal();
      setSelectedRows([]);
    }
  }, [isSuccessDeleteOne, isSuccessDeleteMany]);

  return (
    <Modal
      title=""
      centered
      open={openModalDelete}
      onOk={() => handleCloseModal()}
      onCancel={() => handleCloseModal()}
      width={600}
      footer={[]}
    >
      <div>
        <div className="py-8">
          <BsTrash className="mx-auto text-red mb-2" size={24} />
          <h2 className="text-red text-center font-medium text-xl">
            Delete {modaleDeleteType == "deleteMany" ? "histories" : "history"}
          </h2>
        </div>
        <div className="bg-gray-light/30 px-16 py-8 border-t border-gray/20">
          <p className="text-dark/80 mb-5 font-medium text-[15px] leading-6">
            Deleting the{" "}
            {modaleDeleteType == "deleteMany" ? "histories" : "history"} will
            permanently remove it from your application
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline-gray"
              size="default"
              rounded="default"
              className="bg-white"
              onClick={handleCloseModal}
            >
              No, Keep History
            </Button>
            {modaleDeleteType == "deleteOne" && (
              <Button
                onClick={deleteHistoryById}
                variant="destructive"
                size="default"
                rounded="default"
                className="gap-3"
              >
                {isLoadingDeleteOne ? (
                  <>
                    <SpinLoading color="#ffffff" />
                    <span>Yes, Delete History</span>
                  </>
                ) : (
                  <span>Yes, Delete History</span>
                )}
              </Button>
            )}
            {modaleDeleteType == "deleteMany" && (
              <Button
                onClick={deleteManyHistoryById}
                variant="destructive"
                size="default"
                rounded="default"
                className="gap-3"
              >
                {isLoadingDeleteMany ? (
                  <>
                    <SpinLoading color="#ffffff" />
                    <span>Yes, Delete Histories</span>
                  </>
                ) : (
                  <span>Yes, Delete Histories</span>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteHistory;
