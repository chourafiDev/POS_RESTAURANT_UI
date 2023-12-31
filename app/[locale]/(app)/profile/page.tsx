import Form from "@/components/profile/Form";
import Password from "@/components/profile/Password";
import Profile from "@/components/profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS | Profile",
};

const tabs = [
  {
    title: "Personal Information",
    id: "personal-information",
    content: Form,
  },
  {
    title: "Login & Password",
    id: "change-password",
    content: Password,
  },
];

const page = () => {
  return (
    <div className="min-h-screen p-5">
      <Profile tabs={tabs} />
    </div>
  );
};

export default page;
