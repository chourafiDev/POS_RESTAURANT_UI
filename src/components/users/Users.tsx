"use client";

import { users } from "@/utils/data";
import { ImSearch } from "react-icons/im";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { LuPlusCircle } from "react-icons/lu";
import { AiFillEdit } from "react-icons/ai";
import { FaEye } from "react-icons/fa";
import DeleteUser from "./DeleteUser";
import { useDisclosure } from "@mantine/hooks";
import AddUser from "./AddUser";
import Button from "../ui/Button";
import EditUser from "./EditUser";
import DetailsUser from "./DetailsUser";

const Users = () => {
  // handle add user
  const [modalAddOpened, { open: openModalAdd, close: closeModalAdd }] =
    useDisclosure(false);

  //   const handleAddUser = (user) => {};

  // handle edit user
  const [modalEditOpened, { open: openModalEdit, close: closeModalEdit }] =
    useDisclosure(false);

  // handle details user
  const [
    modalDetailsOpened,
    { open: openModalDetails, close: closeModalDetails },
  ] = useDisclosure(false);

  // handle delete user
  const [
    modalDeleteOpened,
    { open: openModalDelete, close: closeModalDelete },
  ] = useDisclosure(false);

  //   const handleDleteUserById = (userId) => {};

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-dark font-semibold mb-5 text-[18px]">List Users</h1>
        <div className="inline-block">
          <Button
            variant="default"
            size="default"
            rounded="full"
            className="gap-3"
            onClick={openModalAdd}
          >
            Add User
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
                      First Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-dark">
                      Last Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-dark">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-4 text-dark">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-4 text-dark">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-gray/10">
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                        {user.firstName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                        {user.lastName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                        {user.phone}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-dark/70">
                        {user.email}
                      </td>

                      <td className="flex items-center gap-2 py-4 whitespace-nowrap">
                        <button
                          onClick={openModalDetails}
                          className="w-9 h-9 rounded-md bg-brand/30 text-brand flex justify-center items-center"
                        >
                          <FaEye size={16} />
                        </button>
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

      {/* Modal Add User */}
      <AddUser modalAddOpened={modalAddOpened} closeModalAdd={closeModalAdd} />

      {/* Modal Edit User */}
      <EditUser
        modalEditOpened={modalEditOpened}
        closeModalEdit={closeModalEdit}
      />

      {/* Modal Details User */}
      <DetailsUser
        modalDetailsOpened={modalDetailsOpened}
        closeModalDetails={closeModalDetails}
      />

      {/* Modal Delete User */}
      <DeleteUser
        modalDeleteOpened={modalDeleteOpened}
        closeModalDelete={closeModalDelete}
      />
    </>
  );
};

export default Users;
