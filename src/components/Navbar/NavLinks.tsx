import Link from "next/link";

const NavLinks = () => {
  return (
    <ul className="flex items-center gap-x-8 text-gray">
      <li className="text-md font-normal hover:text-brand duration-200 ease-in">
        <Link href="/">Reservation</Link>
      </li>
      <li className="text-md font-normal hover:text-brand duration-200 ease-in">
        <Link href="/">Menu</Link>
      </li>
      <li className="text-md font-normal hover:text-brand duration-200 ease-in">
        <Link href="/">Delivery</Link>
      </li>
      <li className="text-md font-normal hover:text-brand duration-200 ease-in">
        <Link href="/">Accounting</Link>
      </li>
    </ul>
  );
};

export default NavLinks;
