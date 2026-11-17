"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@iconify/react";

function subscribe() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}

/** Iconify loads brand icons on the client — defer until client to avoid SSR mismatch. */
function GoogleIcon() {
  const isClient = useIsClient();

  if (!isClient) {
    return <span className="inline-block size-[18px]" aria-hidden />;
  }

  return <Icon icon="logos:google-icon" width={18} height={18} aria-hidden />;
}

export { GoogleIcon };
