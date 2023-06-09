import Categories from "../components/Categories/Categories";
import { categories } from "@/utils/data";
import Menu from "@/components/menu/Menu";

export default function Home() {
  return (
    <div className="px-4 md:px-6">
      {/* Categories */}
      <Categories categories={categories} />

      {/* Menu */}
      <Menu />
    </div>
  );
}
