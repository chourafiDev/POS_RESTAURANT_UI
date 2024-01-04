import Order from "./Order";
import Bill from "./Bill";
import Button from "../ui/Button";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { noResults } from "@/utils/assets";
import { Drawer } from "antd";
import { useCreateCheckOutSessionMutation } from "@/redux/services/paymentApiSlice";
import SpinLoading from "../ui/SpinLoading";
import Cookie from "js-cookie";

interface CartProps {
  open: boolean;
  hideDrawer: () => void;
}

const Cart = ({ open, hideDrawer }: CartProps) => {
  // get lang from localhost
  const lang = localStorage.getItem("i18nextLng");

  const { cartItems, tableOrderInfo, itemsPrice } = useAppSelector(
    (state) => state.cart
  );

  const qty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const [createCheckOutSession, { isLoading }] =
    useCreateCheckOutSessionMutation();

  const handleCheckOut = async () => {
    try {
      const cookieTableOrder = Cookie.get("tableOrder");

      const tableOrder = cookieTableOrder && JSON.parse(cookieTableOrder);

      const checkOutData = {
        cartItems,
        tableOrder,
        lang,
      };

      const res = await createCheckOutSession(checkOutData).unwrap();

      if (res.url) {
        window.location.href = res.url;

        Cookie.remove("orderPrice");
        Cookie.remove("orders");
        Cookie.remove("tableOrder");
      } else {
        console.error("Error creating checkout session");
      }
    } catch (err: any) {
      console.error("Error creating checkout session");
    }
  };

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
          <div className=" pb-4">
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
                <p className="text-gray text-sm mt-1 font-medium">
                  Phone number : {tableOrderInfo.customer?.phone}
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

              <Bill itemsPrice={itemsPrice} qty={qty} />
            </div>
          </div>

          <Button
            onClick={handleCheckOut}
            variant="default"
            size="default"
            rounded="default"
            className={`gap-2 ${isLoading && "opacity-60"}`}
          >
            {isLoading ? (
              <>
                <SpinLoading color="#264653" />
                <span> Charge ${itemsPrice.toFixed(2)}</span>
              </>
            ) : (
              <span> Charge ${itemsPrice.toFixed(2)}</span>
            )}
          </Button>
        </div>
      )}
    </Drawer>
  );
};

export default Cart;
