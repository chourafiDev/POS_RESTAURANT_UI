import Settings from "@/components/settings/Settings";
import Categories from "@/components/settings/categories/Categories";
import Menu from "@/components/settings/menu/Menu";

const tabs = [
  {
    title: "Menu",
    id: "menu",
    content: Menu,
  },
  {
    title: "Categories",
    id: "categories",
    content: Categories,
  },
];

const page = () => {
  return (
    <div className="p-4 md:p-6 bg-[#fafafa] min-h-full">
      <Settings tabs={tabs} />
    </div>
  );
};

export default page;
