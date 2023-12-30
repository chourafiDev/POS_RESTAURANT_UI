import Products from "@/components/products/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS | Products",
};

const page = () => {
  return (
    <div className="bg-white min-h-screen p-5 rounded-xl shadow-md shadow-gray-light/20">
      <Products />
    </div>
  );
};

export default page;
