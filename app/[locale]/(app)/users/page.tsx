import Users from "@/components/users/Users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS | Users",
};

const page = () => {
  return (
    <div className="bg-white min-h-screen p-5 rounded-xl shadow-md shadow-gray-light/20">
      <Users />
    </div>
  );
};

export default page;
