import { CiViewTable } from "react-icons/ci";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import Button from "../ui/Button";
import { FC, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, MultiSelect, Select, useMantineTheme } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

interface SelectedTablesProps {
  selectedTables: string[];
  removeSingleTable: (item: string) => void;
}

const SelectedTables: FC<SelectedTablesProps> = ({
  selectedTables,
  removeSingleTable,
}) => {
  const guests = ["1", "2", "3", "4", "5", "Outher"];

  // handle open modal
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  // handle select guest
  const [selectedGuest, setSelectedGuest] = useState<string>("");

  const selectGuest = (item: string) => {
    return setSelectedGuest(item);
  };

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
        size="md"
      >
        <div className="px-5 pb-5">
          <div className="text-center mb-6">
            <h2 className="text-dark font-medium text-xl mb-1">New Order</h2>
            <p className="text-gray font-light text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="space-y-3">
            <MultiSelect
              label="Tables"
              data={[
                { value: "T-07", label: "T-07" },
                { value: "T-04", label: "T-04" },
                { value: "T-02", label: "T-02" },
                { value: "T-10", label: "T-10" },
                { value: "T-18", label: "T-18" },
              ]}
              defaultValue={["T-07", "T-02", "T-10", "T-18"]}
              disabled
            />

            <Select
              label="Choose Customers"
              searchable
              nothingFound="No options"
              data={["React", "Angular", "Svelte", "Vue"]}
              styles={() => ({
                item: {
                  "&[data-selected]": {
                    "&, &:hover": {
                      backgroundColor: "#46a0941f",
                      color: "#46A094",
                    },
                  },
                },
              })}
            />

            <div className="pb-4">
              <label className="text-sm text-dark font-medium">Guest</label>
              <ul className="flex items-center gap-2 mt-1">
                {guests.map((guest) => (
                  <li
                    className={`tag ${
                      selectedGuest === guest
                        ? "border-brand bg-brand/20 text-brand"
                        : "border-gray/40 bg-gray/10 text-gray"
                    }`}
                    key={guest}
                    onClick={() => selectGuest(guest)}
                  >
                    {guest}
                  </li>
                ))}
              </ul>
            </div>

            <Button variant="default" size="default" rounded="default">
              Book & Order
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SelectedTables;
