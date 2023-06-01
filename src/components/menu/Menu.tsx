"use client";
import { menu } from "@/utils/data";
import React from "react";
import MenuItem from "./MenuItem";
import { BsSliders } from "react-icons/bs";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const Menu = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <>
      <div className="px-8 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-dark font-medium text-xl mb-3">
            Special menu for you
          </h2>

          <div className="flex gap-3 items-center">
            <button
              onClick={open}
              className="w-10 h-10 flex cursor-pointer justify-center items-center rounded-full border border-gray/30 bg-gray-light/10 text-gray"
            >
              <BsSliders />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-6">
          {menu.map((menu) => (
            <MenuItem menu={menu} key={menu.id} />
          ))}
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        title="Filtres"
        centered
        overlayProps={{
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
      </Modal>
    </>
  );
};

export default Menu;
