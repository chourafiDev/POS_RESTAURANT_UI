import Form from "@/components/profile/Form";
import Password from "@/components/profile/Password";
import Profile from "@/components/profile/Profile";

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
    <div className="p-4 md:p-6 bg-[#fafafa]">
      <Profile tabs={tabs} />
    </div>
  );
};

export default page;
