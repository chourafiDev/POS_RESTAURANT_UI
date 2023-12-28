"use client";

import { FC } from "react";
import Image from "next/image";
import { Modal } from "antd";
import { useGetUserByIdQuery } from "@/redux/services/userApiSlice";

interface DetailsUserProps {
  openModalDetail: boolean;
  handleCloseModal: (type: string) => void;
  userId: string;
}

const DetailsUser: FC<DetailsUserProps> = ({
  openModalDetail,
  handleCloseModal,
  userId,
}) => {
  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useGetUserByIdQuery(userId);

  return (
    <Modal
      title=""
      centered
      open={openModalDetail}
      onOk={() => handleCloseModal("detail")}
      onCancel={() => handleCloseModal("detail")}
      width={800}
      footer={[]}
    >
      <div className="p-4">
        <div className="bg-gray-light/60 rounded-md px-3 py-5 flex items-center gap-4">
          <Image
            src={
              user?.image?.url
                ? user?.image?.url
                : "/assets/imgs/user-default.png"
            }
            width={60}
            height={60}
            className="rounded-full"
            alt="user-image"
          />

          <div>
            <h3 className="text-dark font-medium text-xl">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-dark/60">{user?.role}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-6 gap-4">
          <div>
            <strong className="text-dark font-semibold">Emal Address</strong>
            <p className="text-dark/80 text-[15px]">{user?.email}</p>
          </div>
          <div>
            <strong className="text-dark font-semibold">Phone Number</strong>
            <p className="text-dark/80 text-[15px]">{user?.phone}</p>
          </div>
          <div>
            <strong className="text-dark font-semibold">Role</strong>
            <p className="text-dark/80 text-[15px]">{user?.role}</p>
          </div>
          <div>
            <strong className="text-dark font-semibold">Address</strong>
            <p className="text-dark/80 text-[15px]">{user?.address}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailsUser;
