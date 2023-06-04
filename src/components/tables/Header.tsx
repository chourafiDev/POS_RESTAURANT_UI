import React from "react";
import User from "../User";

const Header = () => {
  return (
    <div className="px-8 py-2 flex justify-between items-center border-b border-gray/20">
      <h1 className="text-dark font-medium text-xl">Table View</h1>
      <div>Logo</div>
      {/* User */}
      <User />
    </div>
  );
};

export default Header;
