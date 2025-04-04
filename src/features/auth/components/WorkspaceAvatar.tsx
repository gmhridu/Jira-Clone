import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

export const WorkspaceAvatar = ({
  image,
  name,
  className,
}: WorkspaceAvatarProps) => {
  if (image) {
    return (
      <div className={cn("size-10 rounded-md overflow-hidden", className)}>
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          priority={true}
          className="bg-muted flex size-full items-center justify-center rounded-full"
        />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-10", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
