import Link from "next/link";
import { TbLayout2, TbClockHour9, TbNotebook } from "react-icons/tb";
import { RiFileList3Line } from "react-icons/ri";

const NavLinks = () => {
  return (
    <ul className="flex items-center gap-x-8 text-gray">
      <li className="text-[15px] font-normal hover:text-brand duration-200 ease-in">
        <Link href="/" className="flex items-center gap-2">
          <TbLayout2 size={18} />
          <p>Dashboard</p>
        </Link>
      </li>
      <li className="text-[15px] font-normal hover:text-brand duration-200 ease-in">
        <Link href="/" className="flex items-center gap-2">
          <TbNotebook size={18} />
          <p>Order List</p>
        </Link>
      </li>
      <li className="text-[15px] font-normal hover:text-brand duration-200 ease-in">
        <Link href="/" className="flex items-center gap-2">
          <TbClockHour9 size={18} />
          <p>History</p>
        </Link>
      </li>
      <li className="text-[15px] font-normal hover:text-brand duration-200 ease-in">
        <Link href="/" className="flex items-center gap-2">
          <RiFileList3Line size={18} />
          <p>Bills</p>
        </Link>
      </li>
    </ul>
  );
};

export default NavLinks;
