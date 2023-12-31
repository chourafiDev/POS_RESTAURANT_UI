import LoginForm from "@/components/auth-forms/LoginForm";
import SwiperSlider from "@/components/login/SwiperSlider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  return (
    <div className="grid grid-cols-2">
      <SwiperSlider />
      <LoginForm locale={locale} />
    </div>
  );
};

export default page;
