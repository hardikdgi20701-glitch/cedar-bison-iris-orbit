import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { followUps, teachChart, welcomeChart, type ChartSnapshot } from "./chart-teacher.ts";

const snap: ChartSnapshot = {
  symbol: "^NSEI",
  name: "NIFTY 50",
  last: 23398,
  prevClose: 23778,
  change: -380,
  changePct: -0.016,
  currency: "INR",
  high: 23610,
  low: 23340,
  volume: 182000000,
  marketState: "closed",
  recentCloses: [24100, 23980, 23820, 23700, 23610, 23480, 23398],
  pe: null,
  fiftyTwoWeekHigh: 26277,
  fiftyTwoWeekLow: 21743,
  analysis: "Oil and a risk-off tape weighed on the last session.",
};

describe("teachChart", () => {
  it("refuses a buy call and still teaches a stop", () => {
    const text = teachChart("Reliance abhi buy karu kya? Target do.", snap);
    assert.match(text, /not a buy\/sell call/i);
    assert.match(text, /No\./);
    assert.match(text, /Stop-loss/i);
    assert.doesNotMatch(text, /ye stock lo/i);
  });

  it("explains a candle using the snapshot range", () => {
    const text = teachChart("Aaj ka candle beginner ko kaise padhna hai?", snap);
    assert.match(text, /OHLC/);
    assert.match(text, /23,340|23340/);
    assert.match(text, /padhai ke liye/i);
  });

  it("labels the last print as bear when it is down", () => {
    const text = teachChart("Bull hai ya bear?", snap);
    assert.match(text, /Bear/i);
    assert.match(text, /-1\.60%/);
  });

  it("welcome names the index and the last print", () => {
    const text = welcomeChart(snap);
    assert.match(text, /NIFTY 50/);
    assert.match(text, /Chart GPT/);
    assert.match(text, /23,398/);
  });

  it("returns follow-ups for a candle question", () => {
    const chips = followUps("candle kaise padhein");
    assert.equal(chips.length, 3);
    assert.ok(chips.some((c) => /volume|trend|wick/i.test(c)));
  });

  it("treats a short follow-up as the previous topic", () => {
    const history = [{ role: "user" as const, text: "Aaj ka candle beginner ko kaise padhna hai?" }];
    const text = teachChart("Aur batao", snap, history);
    assert.match(text, /hammer|engulf|OHLC|wick/i);
    assert.match(text, /padhai ke liye/i);
  });

  it("answers market hours without inventing a Sunday tick", () => {
    const text = teachChart("Market kab open hota hai? Holiday pe kya?", snap);
    assert.match(text, /9:15/);
    assert.match(text, /last close/i);
  });
});
