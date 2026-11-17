"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Typography } from "@/components/ui/typography";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/lib/validation/auth";

const authInputGroupClassName =
  "h-12 rounded-[12px] has-[[data-slot=input-group-control]:focus-visible]:border-foreground has-[[data-slot=input-group-control]:focus-visible]:ring-0";

const authInputClassName = "h-12 px-4 text-[15px] focus-visible:ring-0";

function ForgotPasswordForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit() {
    // Auth API wiring comes next
  }

  return (
    <div className="mx-auto flex w-full max-w-[432px] flex-col items-center">
      <Typography as="h1" variant="authHeading">
        Forgot Password
      </Typography>
      <Typography
        as="p"
        variant="body"
        className="text-muted-foreground mt-3 text-center"
      >
        Enter your email and we&apos;ll send you a link to reset your password.
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 h-12 w-full rounded-[12px] text-[15px] font-medium"
        >
          Send Code
        </Button>

        <Button
          type="button"
          variant="outline"
          className="border-border text-foreground hover:bg-muted/60 h-12 w-full rounded-[12px] border bg-white text-[15px] font-medium"
          onClick={() => router.push("/login")}
        >
          Back
        </Button>
      </form>

      <Typography
        as="p"
        variant="body"
        className="text-muted-foreground mt-6 text-center"
      >
        I have an account?{" "}
        <Link
          href="/login"
          className="text-foreground font-semibold underline underline-offset-2"
        >
          Log in
        </Link>
      </Typography>
    </div>
  );
}

export { ForgotPasswordForm };
