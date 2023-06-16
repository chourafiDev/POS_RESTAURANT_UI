import Users from "@/components/users/Users";
import React from "react";

const page = () => {
  return (
    <div className="p-4 md:p-6 bg-[#fafafa]">
      <div className="bg-white w-full p-4 rounded-xl shadow-md shadow-gray-light/20">
        <Users />
      </div>
    </div>
  );
};

export default page;
