import Button from "@/components/ui/Button";
import { Checkbox, Modal, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import React, { FC } from "react";

interface DetailItemProps {
  modalDetailOpened: boolean;
  closeModalDetail: () => void;
}

const DetailItem: FC<DetailItemProps> = ({
  modalDetailOpened,
  closeModalDetail,
}) => {
  const theme = useMantineTheme();

  return (
    <Modal
      opened={modalDetailOpened}
      onClose={closeModalDetail}
      withCloseButton={true}
      centered
      title="Detail Item"
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
      <div className="grid grid-cols-2 gap-8 p-4">
        <div>
          <div className="w-full h-[250px] shadow-lg shadow-gray-light/80 relative">
            <Image
              src={`/assets/imgs/menu/tacos-salsa.jpg`}
              alt="Tacos Salsa With Chicken"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex justify-between items-center flex-wrap mt-4">
            <h1 className="text-dark/90 text-[18px] font-medium tracking-wide">
              Tacos Salsa With Chicken
            </h1>
            <p className="text-brand font-medium">$23.89</p>
          </div>

          <p className="text-sm font-light text-gray/90 leading-6 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut,
            laboriosam qui sint quae dolore distinctio similique ipsum maiores
            nemo.
          </p>
        </div>
        <div>
          <h3 className="text-dark font-medium">Other options</h3>
          <div className="flex items-center gap-4 flex-wrap mt-3">
            <Checkbox label="Option 1" color="teal" />
            <Checkbox label="Option 2" color="teal" />
            <Checkbox label="Option 3" color="teal" />
            <Checkbox label="Option 4" color="teal" />
            <Checkbox label="Option 5" color="teal" />
            <Checkbox label="Option 6" color="teal" />
            <Checkbox label="Option 7" color="teal" />
          </div>

          <div className="block mt-10">
            <label className="text-dark font-medium">Note</label>
            <textarea
              rows={5}
              className="w-full mt-3 outline-none border border-gray/40 rounded-lg text-dark p-2 font-normal text-sm focus:border-brand/70 duration-300"
            ></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailItem;
