import React from "react";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import Search from "./Search";
import User from "./User";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-4 px-8">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Logo />

        {/* Search */}
        <Search />
      </div>

      {/* Navbar links */}
      <NavLinks />

      {/* User */}
      <User />
    </div>
  );
};

export default Navbar;
