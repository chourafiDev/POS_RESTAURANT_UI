import Image from "next/image";
import { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth-forms/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password",
};

const ForgotPassword = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  return (
    <div className="h-screen bg-[#fafafa] flex flex-col justify-center items-center">
      <div className="w-[40%] bg-white p-8 rounded-xl shadow-2xl shadow-gray-light/50">
        <div className="w-[70px] h-[70px] rounded-full border border-gray-light bg-dark relative mb-6">
          <Image src="/assets/imgs/logo.svg" fill alt="logo" className="p-2" />
        </div>

        <div className="mb-9">
          <h1 className="text-dark/80 font-semibold text-2xl mb-2">
            Forgot Password
          </h1>
          <p className="text-[16px] text-gray/90 font-normal leading-relaxed tracking-wide	">
            No worries, we&apos;ll send you reset instructions
          </p>
        </div>

        <ForgotPasswordForm locale={locale} />
      </div>
    </div>
  );
};

export default ForgotPassword;
