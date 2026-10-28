import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DeskTier = "free" | "research" | "ultra";

type DeskPlan = {
  tier: DeskTier;
  setTier: (tier: DeskTier) => void;
};

export const useDeskPlan = create<DeskPlan>()(
  persist(
    (set) => ({
      tier: "free",
      setTier: (tier) => set({ tier }),
    }),
    { name: "pv-desk-plan" },
  ),
);

export const PLANS: {
  id: DeskTier;
  name: string;
  price: string;
  note: string;
  items: string[];
}[] = [
  {
    id: "free",
    name: "Classroom",
    price: "₹0",
    note: "Start here. No card.",
    items: [
      "X-ray any name on the NSE tape we already track",
      "Levels, volume, and why the candle moved",
      "Paper desk and the academy",
      "English",
    ],
  },
  {
    id: "research",
    name: "Research",
    price: "₹199 / month",
    note: "GST included. Preview does not charge you.",
    items: [
      "Unlimited X-ray reads",
      "Hindi and English",
      "Paste a position and see where it is wrong",
      "Pre-market note before 9:15",
    ],
  },
  {
    id: "ultra",
    name: "Ultra",
    price: "₹10,000 / year",
    note: "About ₹833 a month. ₹12,000 if you paid monthly. Preview does not charge you.",
    items: [
      "Everything in Research",
      "Monday levels for the week",
      "Indicator strip: RSI, MACD, average, pivot",
      "Saved on this device only",
    ],
  },
];
