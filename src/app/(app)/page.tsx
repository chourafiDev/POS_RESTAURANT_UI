import Header from "@/components/dashbord/Header";
import Income from "@/components/dashbord/Income";
import OutOfStock from "@/components/dashbord/OutOfStock";
import Revenue from "@/components/dashbord/Revenue";
import Sales from "@/components/dashbord/Sales";
import Trending from "@/components/dashbord/Trending";

export default function Home() {
  return (
    <div className="px-4 md:px-6 py-6 bg-[#fafafa] min-h-screen">
      <Header />
      <Revenue />

      <div className="flex items-center gap-4 mt-8">
        <Sales />
        <Income />
      </div>

      <div className="flex items-center gap-4 mt-8">
        <Trending />
        <OutOfStock />
      </div>
    </div>
  );
}
