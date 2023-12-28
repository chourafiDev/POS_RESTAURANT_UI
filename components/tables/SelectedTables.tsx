"use clinet";

import { CiViewTable } from "react-icons/ci";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import Button from "../ui/Button";
import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ModalOrder from "./ModalOrder";

interface SelectedTablesProps {
  selectedTables: number[];
  removeSingleTable: (item: number) => void;
  locale: string;
}

const SelectedTables: FC<SelectedTablesProps> = ({
  selectedTables,
  removeSingleTable,
  locale,
}) => {
  // handle open modal
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // handle generate rondom order numebr
  const [orderNumber, setOrderNumber] = useState("");
  useEffect(() => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setOrderNumber(result);
  }, []);

  return (
    <>
      <AnimatePresence initial={false}>
        {selectedTables.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.75 / 2, delay: 0.75 / 2 },
            }}
            exit={{
              opacity: 0,
              y: 100,
              transition: { duration: 0.75 / 2 },
            }}
            className="fixed bottom-4 left-0 w-full px-5 z-50"
          >
            <div className="bg-white p-4 rounded-full border border-gray/30">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gray-light flex justify-center items-center mr-4">
                    <CiViewTable className="text-dark" size={26} />
                  </div>
                  <div className="mr-10">
                    <h6 className="text-dark font-medium text-md">Table</h6>
                    <p className="text-gray text-sm">Order #{orderNumber}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {selectedTables.map((table) => (
                      <div
                        key={table}
                        className="border border-gray-light rounded-lg w-14 h-14 flex justify-center items-center relative"
                      >
                        <p className="text-brand font-medium text-lg">
                          T-{table}
                        </p>
                        <RiCloseCircleFill
                          className="text-red absolute -top-2 -right-2 cursor-pointer"
                          size={24}
                          onClick={() => {
                            removeSingleTable(table);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button order */}
                <div>
                  <Button
                    variant="default"
                    size="lg"
                    rounded="full"
                    className="rounded-full gap-2"
                    onClick={handleOpenModal}
                  >
                    <MdOutlineLocalGroceryStore size={22} />
                    <p>Place Order</p>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ModalOrder
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        selectedTables={selectedTables}
        locale={locale}
        number={orderNumber}
      />
    </>
  );
};

export default SelectedTables;
