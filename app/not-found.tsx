"use client";

import Button from "@/components/ui/Button";
import { notFound } from "@/utils/assets";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex items-center justify-center gap-28">
        <div className="bg-dark px-8 py-20 rounded-xl">
          <h1 className="text-white text-5xl font-bold mb-2">404</h1>
          <p className="text-white text-xl font-semibold">Ooops!</p>
          <p className="text-white text-xl font-semibold m-1">Page Not Found</p>
          <p className="text-white/50 text-base">
            This page doesn&apos;t exist or was removed! <br />
            We suggest you back to home
          </p>

          <Button variant="default" size="lg" rounded="full" className="mt-8">
            Back to Home
          </Button>
        </div>
        <div className="animate-pulse">
          <Image src={notFound} alt="not found" width={400} height={480} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
