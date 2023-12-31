"use client";

import { ChangeEvent, FC, useState } from "react";
import Button from "../ui/Button";
import Image from "next/image";
import Cart from "../cart/Cart";
import { Checkbox, Modal } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import { CheckboxValueType } from "antd/es/checkbox/Group";

interface ModalOrderProps {
  openModalDeatil: boolean;
  handleCloseMoadlDetail: () => void;
  id: string;
  title: string;
  price: number;
  image: { public_id: any; url: any };
  options: string[];
  description: string;
}

const ModalOrder: FC<ModalOrderProps> = ({
  handleCloseMoadlDetail,
  openModalDeatil,
  id,
  title,
  price,
  image,
  options,
  description,
}) => {
  // handle change note
  const [note, setNote] = useState<string>("");
  const handleChnageNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const noteValue = e.target.value;
    setNote(noteValue);
  };

  // handle change option
  const optionsList = options?.map((el) => {
    return { label: el, value: el };
  });

  const [optionsSelected, setOptionsSelected] = useState<any>([]);

  const onChangeOption = (checkedValues: CheckboxValueType[]) => {
    setOptionsSelected([checkedValues]);
  };

  // handle opne drawer
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const hideDrawer = () => {
    setOpen(false);
  };

  // handle add order to cart
  const dispatch = useAppDispatch();

  const addOrderToCart = () => {
    dispatch(
      addToCart({
        type: "increase",
        item: {
          id,
          title,
          price,
          options: optionsSelected,
          image: image?.url,
          qty: 1,
          note,
        },
      })
    );
    showDrawer();
    handleCloseMoadlDetail();
  };

  return (
    <>
      <Modal
        title=""
        centered
        open={openModalDeatil}
        onOk={handleCloseMoadlDetail}
        onCancel={handleCloseMoadlDetail}
        width={800}
        footer={[]}
        forceRender
      >
        <div className="grid grid-cols-2 gap-8 p-4">
          <div>
            <div className="w-full h-[250px] shadow-lg shadow-gray-light/80 relative">
              <Image
                src={image?.url}
                alt={title}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex justify-between items-center flex-wrap mt-4">
              <h1 className="text-dark/90 text-[18px] font-medium tracking-wide">
                {title}
              </h1>
              <p className="text-brand font-medium">${price}</p>
            </div>

            <p className="text-sm font-light text-gray/90 leading-6 mt-2">
              {description}
            </p>

            {/* <div className="flex items-center gap-3 mt-5">
              <button
                className="w-8 h-8 text-lg rounded-md bg-white border-2 border-brand text-brand outline-none"
                onClick={decreaseNumberOfOrders}
              >
                -
              </button>
              <p className="text-dark w-3 flex justify-center">
                {numberOfOrders}
              </p>
              <button
                className="w-8 h-8 text-lg rounded-md bg-brand text-white"
                onClick={increaseNumberOfOrders}
              >
                +
              </button>
            </div> */}
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-dark font-medium">Other options</h3>
              <div className="flex items-center gap-4 flex-wrap mt-3">
                <Checkbox.Group
                  options={optionsList}
                  onChange={onChangeOption}
                />
              </div>

              <div className="block mt-10">
                <label className="text-dark font-medium">Note</label>
                <textarea
                  value={note}
                  onChange={handleChnageNote}
                  rows={5}
                  className="w-full mt-3 outline-none border border-gray/40 rounded-lg text-dark p-2 font-normal text-sm focus:border-brand/70 duration-300"
                ></textarea>
              </div>
            </div>
            <Button
              variant="default"
              size="default"
              rounded="default"
              className="mt-auto"
              onClick={addOrderToCart}
            >
              Add to Bucket
            </Button>
          </div>
        </div>
      </Modal>

      <Cart hideDrawer={hideDrawer} open={open} />
    </>
  );
};

export default ModalOrder;
