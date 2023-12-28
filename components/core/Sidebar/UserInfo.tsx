import { profileDefault } from "@/utils/assets";
import { Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { useGetCurrentUserQuery } from "@/redux/services/userApiSlice";
import { useLogoutMutation } from "@/redux/services/authApiSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { clearCredentials } from "@/redux/features/authSlice";

interface UserInfoProps {
  collapsed: boolean;
  locale: string;
}

const UserInfo: FC<UserInfoProps> = ({ collapsed, locale }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [logout, { isSuccess }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(null).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCredentials());
      router.push("/en/login");
    }
  }, [isSuccess, router]);

  const content = (
    <div className="flex flex-col gap-2 w-[160px]">
      <Link
        href={`/${locale}/profile`}
        className="text-dark font-medium flex items-center gap-2"
      >
        <AiOutlineUser /> <span>My Account</span>
      </Link>
      <button
        onClick={handleLogout}
        className="text-dark font-medium flex items-center gap-2"
      >
        <MdOutlineLogout /> <span>Logout</span>
      </button>
    </div>
  );

  // Fetch profile data
  const { data: profile } = useGetCurrentUserQuery(null);

  return (
    <Popover
      placement="bottomRight"
      content={content}
      trigger="click"
      className="flex items-center gap-2 px-4 py-3 border-b border-b-dark cursor-pointer bg-[#272932]"
    >
      <div className="rounded-full relative w-10 h-10 overflow-hidden">
        <Image
          src={profile?.image?.url ? profile?.image?.url : profileDefault}
          alt="user-default"
          fill
        />
      </div>

      {!collapsed && (
        <div className="flex flex-1 justify-between items-center w-full">
          <p className=" text-md font-semibold items-center text-[15px]">
            <span className="capitalize block text-white">
              {profile?.lastName}
            </span>
            <span className="capitalize block text-[#ABA895] font-medium">
              {profile?.role}
            </span>
          </p>
          <DownOutlined style={{ color: "#ABA895", fontSize: "80%" }} />
        </div>
      )}
    </Popover>
  );
};

export default UserInfo;
