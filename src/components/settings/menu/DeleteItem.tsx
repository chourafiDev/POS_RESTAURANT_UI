"use client";

import Button from "@/components/ui/Button";
import { Modal, useMantineTheme } from "@mantine/core";
import { FC } from "react";
import { BsTrash } from "react-icons/bs";

interface DeleteItemProps {
  modalDeleteOpened: boolean;
  closeModalDelete: () => void;
}

const DeleteItem: FC<DeleteItemProps> = ({
  modalDeleteOpened,
  closeModalDelete,
}) => {
  const theme = useMantineTheme();
  return (
    <Modal
      opened={modalDeleteOpened}
      onClose={closeModalDelete}
      withCloseButton={false}
      centered
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      size="lg"
    >
      <div>
        <div className="py-8">
          <BsTrash className="mx-auto text-red mb-2" size={24} />
          <h2 className="text-red text-center font-medium text-xl">
            Delete Menu Item
          </h2>
        </div>
        <div className="bg-gray-light/30 px-28 py-8 border-t border-gray/20">
          <p className="text-dark/80 mb-5 font-medium text-[15px] leading-6">
            Deleting a menu item will permanently remove it from your
            application
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline-gray"
              size="default"
              rounded="default"
              className="bg-white"
              onClick={closeModalDelete}
            >
              No, Keep Item
            </Button>
            <Button variant="destructive" size="default" rounded="default">
              Yes, Delete Item
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteItem;
