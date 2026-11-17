"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Typography } from "@/components/ui/typography";
import {
  updatePasswordSchema,
  type UpdatePasswordFormValues,
} from "@/lib/validation/auth";

const authInputGroupClassName =
  "h-12 rounded-[12px] has-[[data-slot=input-group-control]:focus-visible]:border-foreground has-[[data-slot=input-group-control]:focus-visible]:ring-0";

const authInputClassName = "h-12 px-4 text-[15px] focus-visible:ring-0";

function UpdatePasswordForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit() {
    // Auth API wiring comes next
  }

  return (
    <div className="mx-auto flex w-full max-w-[432px] flex-col items-center">
      <Typography as="h1" variant="authHeading">
        Update Password
      </Typography>
      <Typography
        as="p"
        variant="body"
        className="text-muted-foreground mt-3 text-center"
      >
        Log in to manage orders, products, customers, and more
      </Typography>

      <form
        className="mt-8 flex w-full flex-col gap-3"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <Field data-invalid={!!errors.email || undefined}>
          <InputGroup className={authInputGroupClassName}>
            <InputGroupInput
              type="email"
              autoComplete="email"
              placeholder="alexsmith.mobbin+1@gmail.com"
              className={authInputClassName}
              aria-invalid={!!errors.email || undefined}
              {...register("email")}
            />
          </InputGroup>
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.password || undefined}>
          <InputGroup className={authInputGroupClassName}>
            <InputGroupInput
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••••••"
              className={authInputClassName}
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

        <Field data-invalid={!!errors.confirmPassword || undefined}>
          <InputGroup className={authInputGroupClassName}>
            <InputGroupInput
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••••••"
              className={authInputClassName}
              aria-invalid={!!errors.confirmPassword || undefined}
              {...register("confirmPassword")}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="button"
                size="icon-sm"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldError errors={[errors.confirmPassword]} />
        </Field>

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
        Already have account{" "}
        <Link
          href="/login"
          className="text-foreground font-semibold underline underline-offset-2"
        >
          Log In
        </Link>
      </Typography>
    </div>
  );
}

export { UpdatePasswordForm };
