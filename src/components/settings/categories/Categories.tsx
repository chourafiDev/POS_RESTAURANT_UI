"use client";

import { FC } from "react";
import { motion } from "framer-motion";

import { categories } from "@/utils/data";
import { ImSearch } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPlusCircle } from "react-icons/lu";
import { AiFillEdit } from "react-icons/ai";
import { useDisclosure } from "@mantine/hooks";
import Button from "@/components/ui/Button";
import Image from "next/image";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import DeleteCategory from "./DeleteCategory";

interface CategoriesProps {
  id: string;
  active: boolean;
}

const Categories: FC<CategoriesProps> = ({ id, active }) => {
  const tabContentVariant = {
    active: {
      display: "block",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    inactive: {
      display: "none",
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  // handle add category
  const [modalAddOpened, { open: openModalAdd, close: closeModalAdd }] =
    useDisclosure(false);

  //   const handleAddCategory = (category) => {};

  // handle edit category
  const [modalEditOpened, { open: openModalEdit, close: closeModalEdit }] =
    useDisclosure(false);

  // handle delete category
  const [
    modalDeleteOpened,
    { open: openModalDelete, close: closeModalDelete },
  ] = useDisclosure(false);

  //   const handleDleteCategoryById = (categoryId) => {};
  return (
    <motion.div
      variants={tabContentVariant}
      animate={active ? "active" : "inactive"}
      initial="inactive"
      className="form bg-white rounded-xl p-6"
    >
      <>
        <div className="flex items-center justify-between">
          <h1 className="text-dark font-semibold mb-5 text-[18px]">
            List Categories
          </h1>
          <div className="inline-block">
            <Button
              variant="default"
              size="default"
              rounded="full"
              className="gap-3"
              onClick={openModalAdd}
            >
              Add Category
              <LuPlusCircle size={20} />
            </Button>
          </div>
        </div>

        <div className="flex items-center bg-gray-light/60 py-[3px] px-4 gap-2 rounded-xl w-full my-6">
          <ImSearch className="text-dark/40" size={17} />
          <input
            type="text"
            className="outline-none px-2 py-3 font-normal bg-transparent text-sm text-gray w-full"
            placeholder="Search menu"
          />
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium border-gray/10">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-dark">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4 text-dark">
                        Icon
                      </th>
                      <th scope="col" className="px-6 py-4 text-dark">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="border-b border-gray/10">
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                          {category.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                          <Image
                            src={`/assets/imgs/icons/${category.icon}`}
                            alt={category.name}
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                        </td>

                        <td className="flex items-center gap-2 py-4 whitespace-nowrap">
                          <button
                            onClick={openModalEdit}
                            className="w-9 h-9 rounded-md bg-yellow/30 text-yellow flex justify-center items-center"
                          >
                            <AiFillEdit size={16} />
                          </button>
                          <button
                            onClick={openModalDelete}
                            className="w-9 h-9 rounded-md bg-red/30 text-red flex justify-center items-center"
                          >
                            <RiDeleteBin5Fill size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Add Item */}
        <AddCategory
          modalAddOpened={modalAddOpened}
          closeModalAdd={closeModalAdd}
        />

        {/* Modal Edit Category */}
        <EditCategory
          modalEditOpened={modalEditOpened}
          closeModalEdit={closeModalEdit}
        />

        {/* Modal Delete Category */}
        <DeleteCategory
          modalDeleteOpened={modalDeleteOpened}
          closeModalDelete={closeModalDelete}
        />
      </>
    </motion.div>
  );
};

export default Categories;
