import Image from "next/image";
import React from "react";
import { useAppSelector } from "@/redux/hooks";

const User = () => {
  const { firstName, lastName, role } = useAppSelector((state) => state.auth);

  return (
    <div className="flex items-center gap-2">
      <Image
        src="/assets/imgs/user.png"
        width={40}
        height={40}
        alt="user"
        className="rounded-full"
      />
      <div>
        <h5 className="text-dark font-semibold text-sm">
          {firstName} {lastName}
        </h5>
        <p className="text-gray text-sm">{role}</p>
      </div>
    </div>
  );
};

export default User;
