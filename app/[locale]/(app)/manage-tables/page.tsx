import Tables from "@/components/manage-tables/Tables";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS | Manage tables",
};

const Page = async () => {
  return (
    <div className="bg-white w-full p-4 rounded-xl shadow-md shadow-gray-light/20">
      <Tables />
    </div>
  );
};

export default Page;
