import Header from "@/components/dashbord/Header";
import Revenue from "@/components/dashbord/Revenue";
import Sales from "@/components/dashbord/Sales";

export default function Home() {
  return (
    <div className="px-4 md:px-6 bg-[#fafafa] min-h-screen">
      <Header />
      <Revenue />

      <div className="flex items-center gap-4 mt-8">
        <Sales />
      </div>
    </div>
  );
}
