import { links } from "@/utils/data";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, Ref, forwardRef } from "react";

interface SideBarProps {
  showNav: boolean;
}

const SideBar: FC<SideBarProps> = forwardRef(
  ({ showNav }, ref: Ref<HTMLDivElement>) => {
    const pathname = usePathname();

    return (
      <div
        ref={ref}
        className="fixed flex flex-col justify-between py-5 w-56 h-full shadow-sm border-r border-gray/20 bg-white"
      >
        <div>
          <picture>
            <Image
              src="/assets/imgs/logo.svg"
              alt="logo"
              width={130}
              height={30}
              className="px-5"
            />
          </picture>

          <ul className="space-y-6 mt-12">
            {links.slice(0, 5).map(({ title, link, icon }) => (
              <li key={title}>
                <Link
                  href={link}
                  className={`flex items-center gap-3 text-[14px] font-normal pl-5 ${
                    pathname == link
                      ? "text-brand border-s-4 border-brand"
                      : "text-gray border-s-4 border-white"
                  }`}
                >
                  {icon}
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 shadow-lg shadow-gray-light/40 rounded-lg py-3 px-1 border border-gray-light/50 bg-white mx-5">
            <Image
              src="/assets/imgs/user.png"
              width={40}
              height={40}
              alt="user"
              className="rounded-full"
            />
            <div>
              <h5 className="text-dark/80 font-semibold text-[15px]">
                Casey Kaspol
              </h5>
              <p className="text-gray/80 text-sm">Cashier</p>
            </div>
          </div>
          <ul className="space-y-6 mt-10 px-5">
            {links.slice(5, 7).map(({ title, link, icon }) => (
              <li key={title}>
                <Link
                  href={link}
                  className="flex items-center gap-3 text-gray text-[14px] font-normal"
                >
                  {icon}
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);

SideBar.displayName = "SideBar";

export default SideBar;
