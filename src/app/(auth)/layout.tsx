import Image from "next/image";
import { AuthBrandPanel } from "@/components/auth/auth-brand-panel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-dvh overflow-hidden bg-[var(--hero)] text-white">
      {/* Waves sit behind the white card (design: under the right panel) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden lg:block">
        <Image
          src="/images/waves-vector.svg"
          alt=""
          width={935}
          height={245}
          className="h-auto w-[min(70%,56rem)] max-w-none"
          aria-hidden
        />
      </div>

      <AuthBrandPanel />

      <main className="relative z-20 flex h-dvh min-w-0 flex-1 flex-col overflow-hidden p-3 lg:p-[10px] lg:pl-2">
        {/* Phone / tablet brand — on dark bg so the white logo stays correct */}
        <div className="flex shrink-0 flex-col items-center gap-3 pt-2 pb-2 lg:hidden">
          <Image
            src="/brand/primary-logo.svg"
            alt="Guided"
            width={174}
            height={186}
            priority
            className="h-auto w-[7.5rem] sm:w-[8.5rem]"
          />
          <span className="inline-flex h-[23px] w-[59px] items-center justify-center rounded-[6px] bg-[#1f3d2e] pt-px font-sans text-[14px] leading-none font-medium text-[#7EE2A8]">
            Admin
          </span>
        </div>

        <div className="text-foreground relative z-20 flex min-h-0 w-full max-w-[813px] flex-1 flex-col overflow-hidden rounded-[24px] bg-white sm:rounded-[30px] lg:ml-auto lg:h-full">
          <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-5 py-8 sm:px-8 sm:py-10 md:px-12 lg:px-16">
            <div className="w-full max-w-[26rem]">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
