import Button from "@/components/ui/Button";
import { useGetProductByIdQuery } from "@/redux/services/productApiSlice";
import { Modal } from "antd";
import Image from "next/image";
import React, { FC } from "react";
import Loading from "@/components/ui/Loading";

interface DetailItemProps {
  openModalDetail: boolean;
  handleCloseModal: (type: string) => void;
  productId: string;
}

const DetailItem: FC<DetailItemProps> = ({
  openModalDetail,
  handleCloseModal,
  productId,
}) => {
  const { data: product, isLoading } = useGetProductByIdQuery(productId);

  return (
    <Modal
      title=""
      centered
      open={openModalDetail}
      onOk={() => handleCloseModal("detail")}
      onCancel={() => handleCloseModal("detail")}
      width={800}
      footer={[]}
      closable={false}
    >
      {isLoading ? (
        <Loading styles="h-[250px]" />
      ) : (
        <div className="grid grid-cols-2 gap-8 p-4">
          <div>
            <div className="w-full h-[250px] shadow-lg shadow-gray-light/80 relative">
              {product?.image?.url && (
                <Image
                  src={product?.image?.url}
                  alt="Tacos Salsa With Chicken"
                  fill
                  className="rounded-lg object-cover"
                />
              )}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center flex-wrap">
              <h1 className="text-dark/90 text-[18px] font-medium tracking-wide">
                {product?.title}
              </h1>
              <p className="text-brand font-medium">${product?.price}</p>
            </div>

            <p className="text-sm font-light text-gray/90 leading-6 mt-2">
              {product?.description}
            </p>

            <h3 className="text-dark font-medium mt-4">Options</h3>
            <div className="flex items-center gap-4 flex-wrap mt-2">
              {product?.options?.map((el: string, index: number) => (
                <p
                  key={index}
                  className="border border-gray-light/80 rounded-full px-4 py-1 text-dark"
                >
                  {el}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default DetailItem;
