"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavButton = () => {
  const pathname = usePathname();

  return (
    <Button asChild variant={"secondary"}>
      <Link href={pathname === "/sign-in" ? "/sign-up" : "sign-in"}>
        {pathname === "/sign-in" ? "Sign Up" : "Login"}
      </Link>
    </Button>
  );
};
