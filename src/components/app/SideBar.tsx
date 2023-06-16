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
        className="fixed flex flex-col justify-between py-5 w-24 h-full shadow-sm border-r border-gray/20 bg-white z-20"
      >
        <div>
          <picture className="flex flex-col items-center">
            <Image
              src="/assets/imgs/logo.svg"
              alt="logo"
              width={45}
              height={40}
              className=""
            />
          </picture>

          <ul className="mt-7">
            {links.map(({ title, link, icon }) => (
              <li key={title}>
                <Link
                  href={link}
                  className={`flex flex-col items-center gap-1 text-[12px] font-medium p-2 mx-3 my-[5px] rounded-lg ${
                    pathname == link ? "text-brand bg-brand/10" : "text-dark/50"
                  }`}
                >
                  {icon}
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* <div> */}
        <div className="flex flex-col items-center gap-1">
          <Link
            href="/profile"
            className={`flex flex-col items-center gap-1 text-[12px] font-semibold ${
              pathname == "profile" ? "text-brand" : "text-dark/30"
            }`}
          >
            <Image
              src="/assets/imgs/user.png"
              width={40}
              height={40}
              alt="user"
              className="rounded-full"
            />
            Profile
          </Link>
        </div>
      </div>
    );
  }
);

SideBar.displayName = "SideBar";

export default SideBar;
