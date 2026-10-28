import { useEffect, useRef } from "react";

/** Fetch on mount, on tab focus, and on an interval while the page is visible. Skips a tick if the last call is still running. */
export function useLiveRefresh(fn: () => void | Promise<unknown>, intervalMs: number, deps: unknown[] = []) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  useEffect(() => {
    const pending = { current: false };
    const run = () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      if (pending.current) return;
      pending.current = true;
      let ret: void | Promise<unknown>;
      try {
        ret = fnRef.current();
      } catch {
        pending.current = false;
        return;
      }
      Promise.resolve(ret).finally(() => {
        pending.current = false;
      });
    };
    run();
    const id = window.setInterval(run, intervalMs);
    const kick = () => {
      if (document.visibilityState === "visible") run();
    };
    document.addEventListener("visibilitychange", kick);
    window.addEventListener("focus", kick);
    window.addEventListener("pageshow", kick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", kick);
      window.removeEventListener("focus", kick);
      window.removeEventListener("pageshow", kick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller passes explicit deps
  }, deps);
}