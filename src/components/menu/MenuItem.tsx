import { FC, useState } from "react";
import { Menu } from "../../../types";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import Cart from "../cart/Cart";
import { Checkbox, Modal, useMantineTheme } from "@mantine/core";
import Button from "../ui/Button";

interface MenuItemProps {
  menu: Menu;
}

const MenuItem: FC<MenuItemProps> = ({ menu: { title, price, image } }) => {
  // handle opne drawer
  const [opened, { open, close }] = useDisclosure(false);

  // handle open modal
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const theme = useMantineTheme();

  // handle select number of orders
  const [numberOfOrders, setNumberOfOrders] = useState(0);

  const decreaseNumberOfOrders = () => {
    if (numberOfOrders === 0) {
      return setNumberOfOrders(0);
    }
    setNumberOfOrders((prev) => prev - 1);
  };

  const increaseNumberOfOrders = () => {
    setNumberOfOrders((prev) => prev + 1);
  };

  // handle add order to cart
  const addOrderToCart = () => {
    open();
    closeModal();
  };

  return (
    <>
      <div onClick={openModal} className="cursor-pointer bg-white">
        <Image
          src={`/assets/imgs/menu/${image}`}
          alt={title}
          width={300}
          height={100}
          className="rounded-md"
        />

        <div className="mt-2">
          <h1 className="text-gray/80 mb-2 text-[14px] font-normal tracking-wide">
            {title}
          </h1>
          <strong className="text-dark font-medium">${price}</strong>
        </div>
      </div>

      <Modal
        opened={modalOpened}
        onClose={closeModal}
        withCloseButton={false}
        centered
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
                src={`/assets/imgs/menu/${image}`}
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut,
              laboriosam qui sint quae dolore distinctio similique ipsum maiores
              nemo.
            </p>

            <div className="flex items-center gap-3 mt-5">
              <button
                className="w-8 h-8 text-lg rounded-md bg-white border-2 border-brand text-brand"
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
            </div>
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

            <Button
              variant="default"
              size="default"
              rounded="default"
              className="mt-10"
              onClick={addOrderToCart}
            >
              Add to Bucket
            </Button>
          </div>
        </div>
      </Modal>

      <Cart opened={opened} close={close} />
    </>
  );
};

export default MenuItem;
