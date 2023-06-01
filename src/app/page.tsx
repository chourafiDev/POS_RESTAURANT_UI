import Navbar from "@/components/Navbar/Navbar";
import Categories from "../components/Categories/Categories";
import { categories } from "@/utils/data";
import Menu from "@/components/menu/Menu";

export default function Home() {
  return (
    <div className="">
      <Navbar />

      {/* Categories */}
      <Categories categories={categories} />

      {/* Menu */}
      <Menu />
    </div>
  );
}
