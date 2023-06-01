import Navbar from "@/components/Navbar/Navbar";
import CategoriesList from "../components/CategoriesList/CategoriesList";
import { categories } from "@/utils/data";
import Menu from "@/components/menu/Menu";

export default function Home() {
  return (
    <div className="">
      <Navbar />

      {/* Categories */}
      <CategoriesList categories={categories} />

      {/* Menu */}
      <Menu />
    </div>
  );
}
