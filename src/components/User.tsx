import Image from "next/image";
import React from "react";

const User = () => {
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
        <h5 className="text-dark font-semibold text-sm">Casey Kaspol</h5>
        <p className="text-gray text-sm">Cashier</p>
      </div>
    </div>
  );
};

export default User;
