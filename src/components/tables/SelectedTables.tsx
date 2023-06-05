import { CiViewTable } from "react-icons/ci";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import Button from "../ui/Button";
import { FC } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, useMantineTheme } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

interface SelectedTablesProps {
  selectedTables: string[];
  removeSingleTable: (item: string) => void;
}

const SelectedTables: FC<SelectedTablesProps> = ({
  selectedTables,
  removeSingleTable,
}) => {
  // handle open modal
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

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
            className="fixed bottom-4 left-0 w-full px-5"
          >
            <div className="bg-white p-4 rounded-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-gray-light flex justify-center items-center mr-4">
                    <CiViewTable className="text-dark" size={26} />
                  </div>
                  <div className="mr-10">
                    <h6 className="text-dark font-medium text-md">Table</h6>
                    <p className="text-gray text-sm">Order #0567</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {selectedTables.map((table) => (
                      <div
                        key={table}
                        className="border border-gray-light rounded-lg w-14 h-14 flex justify-center items-center relative"
                      >
                        <p className="text-brand font-medium text-lg">
                          {table}
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
                    onClick={open}
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

      <Modal
        opened={opened}
        onClose={close}
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
      ></Modal>
    </>
  );
};

export default SelectedTables;
