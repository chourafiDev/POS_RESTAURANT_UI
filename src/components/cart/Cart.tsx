import { oredrs } from "@/utils/data";
import { Drawer } from "@mantine/core";
import Order from "./Order";
import Bill from "./Bill";
import Button from "../ui/Button";

interface CartProps {
  opened: boolean;
  close: () => void;
}

const Cart = ({ opened, close }: CartProps) => {
  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      withCloseButton={false}
      overlayProps={{ opacity: 0.5, blur: 4 }}
    >
      <div className="max-h-screen flex flex-col justify-between gap-3">
        <div className="flex-1 overflow-y-scroll">
          <div className="border-b border-gray-light pb-3">
            <h2 className="text-dark font-medium mb-1 text-lg">
              Current Order
            </h2>
            <p className="text-gray text-sm font-normal">
              Table (T1, T2, T6, T8)
            </p>
          </div>

          <div className="space-y-4 mt-4">
            {oredrs.slice(0, 4).map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </div>

          <Bill />
        </div>
        <div className="flex-1 mb-6">
          <Button variant="default" size="default" className="">
            Charge $93.24
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default Cart;
