"use client"

import { AlertTriangle } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-y-4">
      <AlertTriangle fill="yellow" className="size-7"/>
      <p className="text-sm">Something went wrong!</p>

      <Button variant={'secondary'} size={'sm'} asChild>
        <Link href={"/"}>
        Back to home
        </Link>
      </Button>
    </div>
  );
}
