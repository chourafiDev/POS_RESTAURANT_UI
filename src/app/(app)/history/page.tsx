import Search from "@/components/history/Search";
import Table from "@/components/history/Table";

const Page = () => {
  return (
    <div className="px-4 md:px-6 md:py-6 py-4 bg-[#fafafa]">
      <div className="bg-white w-full p-4 rounded-xl shadow-md shadow-gray-light/20">
        <Search />
        <Table />
      </div>
    </div>
  );
};

export default Page;
