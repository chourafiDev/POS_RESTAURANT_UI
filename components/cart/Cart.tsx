import Order from "./Order";
import Bill from "./Bill";
import Button from "../ui/Button";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { noResults } from "@/utils/assets";
import { Drawer } from "antd";

interface CartProps {
  open: boolean;
  hideDrawer: () => void;
}

const Cart = ({ open, hideDrawer }: CartProps) => {
  const { cartItems, subtotal, totalSalesTax, totalPrice, tableOrderInfo } =
    useAppSelector((state) => state.cart);

  return (
    <Drawer
      title=""
      placement="right"
      onClose={hideDrawer}
      open={open}
      className="bg-brand"
    >
      {cartItems.length <= 0 ? (
        <div className="flex justify-center items-center h-full bg-dark/5 rounded-lg">
          <div className="bounce">
            <Image src={noResults} width={800} alt="not results" />
          </div>
        </div>
      ) : (
        <div>
          <div className=" pb-8">
            <div className="overflow-y-auto no-scrollbar">
              <div className="border-b border-gray-light pb-3">
                <h2 className="text-dark font-medium mb-1 text-lg">
                  Current Order{" "}
                  <span className="text-brand text-[17px]">
                    #{tableOrderInfo.number}
                  </span>
                </h2>
                <p className="text-gray text-sm font-normal">
                  {tableOrderInfo?.tables?.length > 1 ? "Tables" : "Table"} (
                  {tableOrderInfo?.tables
                    ?.map((table: number) => `T-${table}`)
                    .join(", ")}
                  )
                </p>
                <p className="text-gray text-sm mt-2 font-medium">
                  Customer : {tableOrderInfo.customer?.fullname}
                </p>
              </div>

              <div className="row row-cols-1 row-cols-md-2">
                <div className="space-y-4 mt-4">
                  {cartItems.map((item) => (
                    <Order
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      price={item.price}
                      qty={item.qty}
                      options={item.options}
                      note={item.note}
                    />
                  ))}
                </div>
              </div>

              <Bill
                subtotal={subtotal}
                totalSalesTax={totalSalesTax}
                totalPrice={totalPrice}
              />
            </div>
          </div>

          <Button variant="default" size="default" rounded="default">
            Charge ${totalPrice.toFixed(2)}
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default Cart;
