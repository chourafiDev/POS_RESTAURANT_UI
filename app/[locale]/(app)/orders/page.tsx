import Orders from "@/components/orders/Orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS | Orders",
};

export default function Order() {
  return <Orders />;
}
