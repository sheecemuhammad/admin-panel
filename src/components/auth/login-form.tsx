"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { loginSchema, type LoginFormValues } from "@/lib/validation/auth";

function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(_values: LoginFormValues) {
    // Auth API wiring comes next
  }

  return (
    <div className="mx-auto flex w-full max-w-[432px] flex-col items-center">
      <Typography as="h1" variant="authHeading">
        Welcome Back
      </Typography>
      <Typography
        as="p"
        variant="body"
        className="text-muted-foreground mt-3 text-center"
      >
        Log in to manage orders, products, customers, and more
      </Typography>

      <Button
        type="button"
        variant="outline"
        className="border-border text-foreground hover:bg-muted/60 mt-8 h-12 w-full gap-2 rounded-[12px] border bg-white px-4 text-[15px] font-medium"
      >
        <Icon icon="logos:google-icon" width={18} height={18} aria-hidden />
        Continue with Google
      </Button>

      <Separator className="bg-border mt-6 w-full data-horizontal:h-px" />

      <form
        className="mt-6 flex w-full flex-col gap-3"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field data-invalid={!!errors.email || undefined}>
          <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:border-foreground h-12 rounded-[12px] has-[[data-slot=input-group-control]:focus-visible]:ring-0">
            <InputGroupInput
              type="email"
              autoComplete="email"
              placeholder="alexsmith.mobbin+1@gmail.com"
              className="h-12 px-4 text-[15px] focus-visible:ring-0"
              aria-invalid={!!errors.email || undefined}
              {...register("email")}
            />
          </InputGroup>
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.password || undefined}>
          <InputGroup className="has-[[data-slot=input-group-control]:focus-visible]:border-foreground h-12 rounded-[12px] has-[[data-slot=input-group-control]:focus-visible]:ring-0">
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••••••"
              className="h-12 px-4 text-[15px] focus-visible:ring-0"
              aria-invalid={!!errors.password || undefined}
              {...register("password")}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                size="icon-sm"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldError errors={[errors.password]} />
        </Field>

        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-foreground font-sans text-[13px] leading-none font-medium tracking-normal underline decoration-solid [text-decoration-thickness:auto] underline-offset-auto [text-decoration-skip-ink:auto]"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 h-12 w-full rounded-[12px] text-[15px] font-medium"
        >
          Continue
        </Button>
      </form>

      <Typography
        as="p"
        variant="body"
        className="text-muted-foreground mt-6 text-center"
      >
        Not have account?{" "}
        <Link
          href="/signup"
          className="text-foreground font-semibold underline underline-offset-2"
        >
          Sign Up
        </Link>
      </Typography>
    </div>
  );
}

export { LoginForm };
