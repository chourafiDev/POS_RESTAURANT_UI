import Navbar from "@/components/Navbar/Navbar";
import CategoriesList from "../components/CategoriesList/CategoriesList ";
import { data } from "@/utils/data";

export default function Home() {
  return (
    <div className="">
      <Navbar />

      {/* Categories */}
      <div className="px-8">
        <h2 className="text-dark font-medium text-lg mb-6">Categories</h2>
        <CategoriesList data={data} />
      </div>
    </div>
  );
}
