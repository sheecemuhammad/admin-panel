import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      /** Newsreader 32 — hero / display */
      display: "font-heading text-[32px] leading-tight tracking-tight",
      /** Inter 700 — auth welcome title (28 → 32 → 36) */
      authHeading:
        "font-sans text-center text-[28px] font-bold leading-[1.15] tracking-tight sm:text-[32px] md:text-[36px]",
      /** Inter 26 — screen title */
      screenHeading: "font-sans text-[26px] leading-snug tracking-tight",
      /** Inter 20 — section title */
      sectionHeading: "font-sans text-[20px] leading-snug",
      /** Inter 15–16 — body / interface */
      body: "font-sans text-[15px] leading-relaxed md:text-base",
      /** Inter 13–14 — supporting / metadata */
      supporting:
        "font-sans text-[13px] leading-normal text-muted-foreground md:text-sm",
      /** Inter 13–14 — labels (same scale as supporting) */
      label: "font-sans text-[13px] font-medium leading-normal md:text-sm",
      /** Newsreader 19–23 — scripture / quote */
      scripture:
        "font-heading text-[19px] leading-[1.5] md:text-[23px] md:leading-[1.8]",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyElement = React.ElementType;

type TypographyProps<T extends TypographyElement = "p"> = {
  as?: T;
  children?: React.ReactNode;
  className?: string;
} & VariantProps<typeof typographyVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

function Typography<T extends TypographyElement = "p">({
  as,
  className,
  variant,
  ...props
}: TypographyProps<T>) {
  const Comp = as ?? "p";

  return (
    <Comp
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Typography, typographyVariants };
export type { TypographyProps };
