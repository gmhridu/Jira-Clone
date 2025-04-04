"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "../api/useLogout";
import { Loader2 } from "lucide-react";

export const LogoutButton = () => {
  const { mutate, isPending } = useLogout();
  return (
    <Button disabled={false} size={"default"} onClick={() => mutate()}>
      {isPending ? <Loader2 className="animate-spin text-center" /> : "Logout"}
    </Button>
  );
};
