import ResetPasswordForm from "@/components/auth-forms/ResetPasswordForm";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Reset password",
};

const ResetPassword = ({
  params: { tokenParam },
}: {
  params: { tokenParam: string };
}) => {
  return (
    <div className="h-screen bg-[#fafafa] flex flex-col justify-center items-center">
      <div className="w-[40%] bg-white p-8 rounded-xl shadow-2xl shadow-gray-light/50">
        <div className="w-[70px] h-[70px] rounded-full border border-gray-light bg-dark relative mb-6">
          <Image src="/assets/imgs/logo.svg" fill alt="logo" className="p-2" />
        </div>

        <div className="mb-5">
          <h1 className="text-dark/80 font-semibold text-2xl mb-2">
            Reset Password
          </h1>
          <p className="text-[16px] text-gray/90 font-normal leading-relaxed tracking-wide	">
            Enter the information below to reset your password
          </p>
        </div>

        <ResetPasswordForm tokenParam={tokenParam} />
      </div>
    </div>
  );
};

export default ResetPassword;
