import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compute-mHK8Me9p.js
var computeWithPython_createServerFn_handler = createServerRpc({
	id: "1f283707b4c7941aa578f7972601f7ec547824b6dcf806145ab43cc0cdbcef95",
	name: "computeWithPython",
	filename: "src/lib/compute.ts"
}, (opts) => computeWithPython.__executeServer(opts));
var computeWithPython = createServerFn({ method: "POST" }).validator((data) => {
	if (typeof data !== "object" || data === null) throw new Error("Invalid payload");
	return data;
}).handler(computeWithPython_createServerFn_handler, async ({ data }) => {
	const { spawnSync } = await import("node:child_process");
	const { join } = await import("node:path");
	const result = spawnSync("python3", [join(process.cwd(), "python/sip_engine.py")], {
		input: JSON.stringify(data),
		encoding: "utf-8",
		timeout: 12e3,
		maxBuffer: 2097152
	});
	if (result.error || result.status !== 0) throw new Error((result.stderr || result.error?.message || "Python engine failed").slice(0, 400));
	return JSON.parse(result.stdout);
});
//#endregion
export { computeWithPython_createServerFn_handler };
