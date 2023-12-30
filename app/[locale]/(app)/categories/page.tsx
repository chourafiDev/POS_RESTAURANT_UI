import CategoriesList from "@/components/categories/Categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS | Categories",
};

const page = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md shadow-gray-light/20">
      <CategoriesList />
    </div>
  );
};

export default page;
