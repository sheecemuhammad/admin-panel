"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Typography } from "@/components/ui/typography";
import {
  verificationCodeSchema,
  type VerificationCodeFormValues,
} from "@/lib/validation/auth";

const otpSlotClassName =
  "size-12 rounded-[12px] border border-input text-[15px] first:rounded-[12px] first:border-l last:rounded-[12px] data-[active=true]:border-foreground data-[active=true]:ring-0 data-[active=true]:ring-transparent";

function VerificationCodeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerificationCodeFormValues>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit() {
    // Auth API wiring comes next
  }

  function onResendCode() {
    // Resend code API wiring comes next
  }

  return (
    <div className="mx-auto flex w-full max-w-[432px] flex-col items-center">
      <Typography as="h1" variant="authHeading">
        Verification Code
      </Typography>
      <Typography
        as="p"
        variant="body"
        className="text-muted-foreground mt-3 text-center"
      >
        We sent a verification code to your email address. Please enter the code
        below.
      </Typography>

      <form
        className="mt-8 flex w-full flex-col items-center"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-fit flex-col items-stretch gap-6">
          <Field
            data-invalid={!!errors.code || undefined}
            className="items-center"
          >
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <InputOTP
                  maxLength={6}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  containerClassName="justify-center gap-0"
                  aria-invalid={!!errors.code || undefined}
                >
                  <InputOTPGroup className="gap-2.5">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className={otpSlotClassName}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            />
            <FieldError errors={[errors.code]} />
          </Field>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-[12px] text-[15px] font-medium"
          >
            Verify
          </Button>
        </div>
      </form>

      <Typography
        as="p"
        variant="body"
        className="text-muted-foreground mt-6 text-center"
      >
        Didn&apos;t receive code?{" "}
        <button
          type="button"
          onClick={onResendCode}
          className="text-foreground font-semibold underline underline-offset-2"
        >
          Resend Code
        </button>
      </Typography>
    </div>
  );
}

export { VerificationCodeForm };
