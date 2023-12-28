import { oredrs } from "@/utils/data";
import { Drawer } from "antd";
import Image from "next/image";

interface OrderDetailsProps {
  open: boolean;
  hideDrawer: () => void;
  orderId: string;
  table: string;
}

const OrderDetails = ({
  hideDrawer,
  open,
  orderId,
  table,
}: OrderDetailsProps) => {
  return (
    <Drawer
      title="List Orders"
      placement="right"
      onClose={hideDrawer}
      open={open}
    >
      <div className="max-h-screen flex flex-col justify-between gap-3">
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="pb-3 flex justify-between items-center">
            <div>
              <h2 className="text-gray mb-1 text-sm font-medium">Order ID</h2>
              <p className="text-dark text-[14px] font-semibold">{orderId}</p>
            </div>
            <div>
              <h2 className="text-gray mb-1 text-sm font-medium">Table</h2>
              <p className="text-dark text-[14px] font-semibold text-right">
                {table}
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {oredrs.map(({ id, title, image, desc, price, total }) => (
              <div
                key={id}
                className="flex items-center gap-3 w-full border-b border-gray-light/50 pb-2"
              >
                <div className="w-[80px] h-[70px] relative">
                  <Image
                    src={`/assets/imgs/orders/${image}`}
                    fill
                    alt={title}
                    className="rounded-lg object-cover"
                  />
                </div>

                <div className="w-full">
                  <h5 className="text-dark font-medium">
                    {title} {id}
                  </h5>
                  <p className="text-gray text-sm font-light">{desc}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray text-sm">{total}x</p>
                    <p className="text-brand font-medium">${price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#F2F3F7] rounded-lg p-6 mt-10 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-dark/60 font-normal">Subtotal</h4>
              <p className="text-dark font-medium">$93.45</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-dark/60 font-normal">Discount sales</h4>
              <p className="text-dark font-medium">-$5.00</p>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-dark/60 font-normal">Total sales tax</h4>
              <p className="text-dark font-medium">-$5.00</p>
            </div>
            <div className="border-dashed-with-spacing relative mb-6 mt-7">
              <div className="absolute -bottom-3 -left-9 w-7 h-7 rounded-full bg-white"></div>
              <div className="absolute -bottom-3 -right-9 w-7 h-7 rounded-full bg-white"></div>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="text-dark text-xl font-medium">Total</h4>
              <p className="text-dark text-xl font-medium">$93.24</p>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default OrderDetails;
