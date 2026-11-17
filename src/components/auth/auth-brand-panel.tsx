import Image from "next/image";

function AuthBrandPanel() {
  return (
    <aside className="relative z-10 hidden h-dvh w-[42%] shrink-0 flex-col lg:flex">
      <div className="absolute top-[25px] left-[24px] z-20">
        <span className="inline-flex h-[23px] w-[59px] items-center justify-center rounded-[6px] bg-[#1f3d2e] pt-px font-sans text-[14px] leading-none font-medium tracking-normal text-[#7EE2A8]">
          Admin
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-[22vh] xl:px-8 xl:pb-[18vh]">
        <Image
          src="/brand/primary-logo.svg"
          alt="Guided"
          width={174}
          height={186}
          priority
          className="h-auto w-[8.5rem] xl:w-[10.875rem]"
        />
      </div>
    </aside>
  );
}

export { AuthBrandPanel };
