import Categories from "../../components/Categories/Categories";
import { categories } from "@/utils/data";
import Menu from "@/components/menu/Menu";
import Search from "@/components/Search";

export default function Order() {
  return (
    <div className="px-4 md:px-6 bg-[#fafafa]">
      {/* Search */}
      <Search />

      {/* Categories */}
      <Categories categories={categories} />

      {/* Menu */}
      <Menu />
    </div>
  );
}
