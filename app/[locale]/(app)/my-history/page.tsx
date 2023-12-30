import History from "@/components/history/my/History";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS | My history",
};

const Page = () => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md shadow-gray-light/20">
      <History />
    </div>
  );
};

export default Page;
