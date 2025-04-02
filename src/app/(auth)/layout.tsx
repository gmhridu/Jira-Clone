import Image from "next/image";
import React from "react";
import { NavButton } from "./_components/NavButton";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image
            src={"/logo.svg"}
            height={56}
            width={152}
            alt="logo"
            priority={true}
          />
          <NavButton />
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}
