"use client";

import { useCurrent } from "@/features/auth/api/useCurrent";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface AuthenticatedProps {
  children: React.ReactNode;
}

export default function Authenticated({ children }: AuthenticatedProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useCurrent();

  if (!isLoading && !data) {
    router.replace(`/sign-in?redirect=${encodeURIComponent(pathname)}`);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loader2 className="animate-spin h-6 w-6 text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
