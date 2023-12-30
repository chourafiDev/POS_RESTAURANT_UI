import History from "@/components/history/all/History";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS | All history",
};

const Page = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md shadow-gray-light/20">
      <History />
    </div>
  );
};

export default Page;
