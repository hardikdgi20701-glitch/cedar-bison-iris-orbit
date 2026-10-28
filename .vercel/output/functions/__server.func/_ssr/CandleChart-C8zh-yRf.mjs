import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-Hzo_s2-C.mjs";
import { C as require_jsx_runtime, X as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ye, i as nr, n as Qe, r as le, t as $i } from "../_libs/lightweight-charts.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CandleChart-C8zh-yRf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function sma(values, period) {
	const out = [];
	let sum = 0;
	for (let i = 0; i < values.length; i++) {
		sum += values[i];
		if (i >= period) sum -= values[i - period];
		out.push(i >= period - 1 ? sum / period : null);
	}
	return out;
}
function px(n) {
	return n.toLocaleString("en-IN", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	});
}
function barsOf(series, mark) {
	const rows = series.points.filter((p) => Number.isFinite(p.close) && p.t > 0);
	const data = rows.map((p, i) => {
		const prev = rows[i - 1]?.close ?? p.open ?? p.close;
		const open = p.open ?? prev;
		const close = p.close;
		const high = p.high ?? Math.max(open, close);
		const low = p.low ?? Math.min(open, close);
		return {
			time: Math.floor(p.t / 1e3),
			open,
			high: Math.max(high, open, close),
			low: Math.min(low, open, close),
			close,
			volume: p.volume ?? 0
		};
	});
	const unique = data.filter((row, i) => i === 0 || row.time !== data[i - 1].time);
	const last = unique[unique.length - 1];
	if (last && mark && mark > 0) {
		if (Math.abs(last.close - mark) / mark < .03) {
			last.close = mark;
			last.high = Math.max(last.high, mark);
			last.low = Math.min(last.low, mark);
		}
	}
	return unique;
}
function CandleChart({ series, mark, stop, target, tall = false, onPick }) {
	const host = (0, import_react.useRef)(null);
	const legend = (0, import_react.useRef)(null);
	const bag = (0, import_react.useRef)(null);
	const pick = (0, import_react.useRef)(onPick);
	pick.current = onPick;
	const fitKey = (0, import_react.useRef)("");
	(0, import_react.useEffect)(() => {
		const el = host.current;
		if (!el) return;
		const chart = le(el, {
			autoSize: true,
			layout: {
				background: {
					type: $i.Solid,
					color: "#ffffff"
				},
				textColor: "#131722",
				fontFamily: "Roboto, system-ui, sans-serif",
				fontSize: 12
			},
			grid: {
				vertLines: { color: "#f0f3fa" },
				horzLines: { color: "#f0f3fa" }
			},
			rightPriceScale: {
				borderColor: "#e0e3eb",
				scaleMargins: {
					top: .08,
					bottom: .22
				}
			},
			timeScale: {
				borderColor: "#e0e3eb",
				timeVisible: true,
				secondsVisible: false,
				rightOffset: 4
			},
			crosshair: { mode: 1 },
			handleScroll: { vertTouchDrag: false },
			localization: { priceFormatter: (p) => px(p) }
		});
		const candles = chart.addSeries(Qe, {
			upColor: "#089981",
			downColor: "#f23645",
			borderUpColor: "#089981",
			borderDownColor: "#f23645",
			wickUpColor: "#089981",
			wickDownColor: "#f23645",
			priceLineVisible: true
		});
		const volume = chart.addSeries(nr, {
			priceFormat: { type: "volume" },
			priceScaleId: "vol",
			lastValueVisible: false,
			priceLineVisible: false
		});
		chart.priceScale("vol").applyOptions({ scaleMargins: {
			top: .82,
			bottom: 0
		} });
		const fast = chart.addSeries(ye, {
			color: "#2962ff",
			lineWidth: 2,
			priceLineVisible: false,
			lastValueVisible: false,
			crosshairMarkerVisible: false
		});
		const slow = chart.addSeries(ye, {
			color: "#ff6d00",
			lineWidth: 2,
			priceLineVisible: false,
			lastValueVisible: false,
			crosshairMarkerVisible: false
		});
		const paint = (param) => {
			const node = legend.current;
			if (!node) return;
			const row = param.seriesData.get(candles);
			if (!row || row.close == null) return;
			node.innerHTML = `<span class="${row.close >= (row.open ?? row.close) ? "text-[#089981]" : "text-[#f23645]"}">O ${px(row.open ?? row.close)} &nbsp; H ${px(row.high ?? row.close)} &nbsp; L ${px(row.low ?? row.close)} &nbsp; C ${px(row.close)}</span>`;
		};
		chart.subscribeCrosshairMove(paint);
		chart.subscribeClick((param) => {
			const y = param.point?.y;
			if (y == null || !pick.current) return;
			const price = candles.coordinateToPrice(y);
			if (price == null || !Number.isFinite(price)) return;
			pick.current(price);
		});
		bag.current = {
			chart,
			candles,
			volume,
			fast,
			slow,
			lines: []
		};
		return () => {
			chart.remove();
			bag.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const api = bag.current;
		if (!api) return;
		const bars = barsOf(series, mark);
		api.chart.applyOptions({ timeScale: {
			timeVisible: series.range === "1d" || series.range === "5d",
			secondsVisible: false
		} });
		api.candles.setData(bars.map(({ time, open, high, low, close }) => ({
			time,
			open,
			high,
			low,
			close
		})));
		api.volume.setData(bars.map((row) => ({
			time: row.time,
			value: row.volume,
			color: row.close >= row.open ? "rgba(8,153,129,0.45)" : "rgba(242,54,69,0.45)"
		})));
		if (bars.length > 20) {
			const closes = bars.map((r) => r.close);
			const s20 = sma(closes, 20);
			const s50 = sma(closes, Math.min(50, Math.max(20, Math.floor(closes.length / 3))));
			api.fast.setData(bars.flatMap((row, i) => s20[i] == null ? [] : [{
				time: row.time,
				value: s20[i]
			}]));
			api.slow.setData(bars.flatMap((row, i) => s50[i] == null ? [] : [{
				time: row.time,
				value: s50[i]
			}]));
		} else {
			api.fast.setData([]);
			api.slow.setData([]);
		}
		for (const line of api.lines) api.candles.removePriceLine(line);
		api.lines = [];
		const last = bars[bars.length - 1];
		if (last) {
			const up = last.close >= last.open;
			api.candles.applyOptions({ priceLineColor: up ? "#089981" : "#f23645" });
			if (legend.current) legend.current.innerHTML = `<span class="${up ? "text-[#089981]" : "text-[#f23645]"}">O ${px(last.open)} &nbsp; H ${px(last.high)} &nbsp; L ${px(last.low)} &nbsp; C ${px(last.close)}</span>`;
		}
		if (stop && stop > 0) api.lines.push(api.candles.createPriceLine({
			price: stop,
			color: "#f23645",
			lineWidth: 1,
			lineStyle: 2,
			title: "Stop",
			axisLabelVisible: true
		}));
		if (target && target > 0) api.lines.push(api.candles.createPriceLine({
			price: target,
			color: "#089981",
			lineWidth: 1,
			lineStyle: 2,
			title: "Target",
			axisLabelVisible: true
		}));
		const key = `${series.symbol}:${series.range}:${bars.length}`;
		if (fitKey.current !== key) {
			fitKey.current = key;
			api.chart.timeScale().fitContent();
		}
	}, [
		series,
		mark,
		stop,
		target
	]);
	if (!series.points.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid place-items-center text-sm text-muted", tall ? "h-[min(52vh,520px)]" : "h-80"),
		children: "No candles for this range yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: legend,
			className: "pointer-events-none absolute left-2 top-1 z-10 text-[11px] font-medium tabular-nums text-[#131722]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: host,
			className: cn("w-full", tall ? "h-[min(52vh,520px)] min-h-[320px]" : "h-72 sm:h-[380px]")
		})]
	});
}
//#endregion
export { CandleChart as t };
