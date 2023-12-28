import CartButton from "@/components/menu/CartButton";
import Categories from "../../../../components/menu/Categories";
import Menu from "@/components/menu/Menu";

export default async function Page() {
  return (
    <>
      <Categories />

      <Menu />

      <CartButton />
    </>
  );
}
