import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denied 403",
};

const page = () => {
  return (
    <main>
      <div className="bg-white py-32 rounded-lg flex flex-col justify-center items-center">
        <h1 className="text-brand font-bold text-[3rem]">403</h1>
        <h2 className="text-dark font-medium mt-3 text-2xl">Access Denied</h2>
        <p className="text-dark/80 text-center mt-4">
          Sorry, but you don&apos;t have permission to access this page.
        </p>
        <p className="text-dark/80">You can go back to your pages</p>
      </div>
    </main>
  );
};

export default page;
