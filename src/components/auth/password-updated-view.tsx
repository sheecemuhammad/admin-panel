import Link from "next/link";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

function PasswordUpdatedView() {
  return (
    <div className="mx-auto flex w-full max-w-[432px] flex-col items-center">
      <Typography as="h1" variant="authHeading">
        Password Updated
      </Typography>
      <Typography
        as="p"
        variant="body"
        className="text-muted-foreground mt-3 text-center"
      >
        Your password has successfully changed
      </Typography>

      <Link
        href="/login"
        className={cn(
          buttonVariants({ variant: "default" }),
          "mt-8 h-12 w-full rounded-[12px] text-[15px] font-medium"
        )}
      >
        Login
      </Link>
    </div>
  );
}

export { PasswordUpdatedView };
