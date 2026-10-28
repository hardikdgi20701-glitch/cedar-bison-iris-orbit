import { useEffect } from "react";
import { useSiply } from "@/lib/store";

/** Rehydrate local lists and profile. Cloud sync is off in this build. */
export function CloudSync() {
  useEffect(() => {
    void useSiply.persist.rehydrate();
  }, []);
  return null;
}
