import Image from "next/image";
import { cn } from "cn";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/brand/primary-logo.svg"
      alt="Guided"
      width={174}
      height={186}
      priority={priority}
      className={cn("h-auto w-[10.875rem]", className)}
    />
  );
}

export { BrandLogo };
