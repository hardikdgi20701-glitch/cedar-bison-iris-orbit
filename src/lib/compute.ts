import { createServerFn } from "@tanstack/react-start";
import type { PlanResult } from "./types";

export const computeWithPython = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null) throw new Error("Invalid payload");
    return data as { profile: unknown; goals: unknown; monteCarlo?: boolean };
  })
  .handler(async ({ data }): Promise<PlanResult> => {
    const { spawnSync } = await import("node:child_process");
    const { join } = await import("node:path");
    const script = join(process.cwd(), "python/sip_engine.py");
    const result = spawnSync("python3", [script], {
      input: JSON.stringify(data),
      encoding: "utf-8",
      timeout: 12000,
      maxBuffer: 2 * 1024 * 1024,
    });
    if (result.error || result.status !== 0) {
      throw new Error((result.stderr || result.error?.message || "Python engine failed").slice(0, 400));
    }
    return JSON.parse(result.stdout) as PlanResult;
  });
