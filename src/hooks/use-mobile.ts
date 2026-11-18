import * as React from "react";

const MOBILE_BREAKPOINT = 768;

function getIsMobile() {
  return window.innerWidth < MOBILE_BREAKPOINT;
}

function useIsMobile() {
  return React.useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    getIsMobile,
    () => false
  );
}

/** `true` at the Tailwind `md` breakpoint and above. */
function useIsMdUp() {
  return !useIsMobile();
}

export { MOBILE_BREAKPOINT, useIsMobile, useIsMdUp };
