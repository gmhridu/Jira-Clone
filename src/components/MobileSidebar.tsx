"use client";

import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Sidebar } from "./Sidebar";
import { usePathname } from "next/navigation";

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant={"secondary"} className="lg:hidden size-9">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
      <SheetHeader className="sr-only">
        <SheetTitle className="">Navigation Menu</SheetTitle>
        <SheetDescription className="">
          This sidebar provides quick access to different sections of the
          application. Use the menu options to navigate.
        </SheetDescription>
      </SheetHeader>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
