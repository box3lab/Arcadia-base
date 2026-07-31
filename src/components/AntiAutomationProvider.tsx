"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { automationDetector, type DetectionState, type RiskLevel } from "../lib/antiAutomation";

const Ctx = createContext<DetectionState>({ score: 0, level: "clean" });
export const useAutomationRisk = () => useContext(Ctx);

export default function AntiAutomationProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DetectionState>({ score: 0, level: "clean" });

  useEffect(() => {
    automationDetector.start();
    const iv = setInterval(() => setState(automationDetector.getState()), 3000);
    return () => { clearInterval(iv); automationDetector.stop(); };
  }, []);

  const cls = state.level !== "clean" ? `anti-auto-${state.level}` : "";

  return (
    <Ctx.Provider value={state}>
      <div className={cls}>
        {children}
        {state.level !== "clean" && <ScanLine intensity={state.score} />}
      </div>
    </Ctx.Provider>
  );
}

function ScanLine({ intensity }: { intensity: number }) {
  const opacity = Math.min(0.55, 0.12 + intensity * 0.004);
  const speed = Math.max(1.8, 5 - intensity * 0.03);
  return (
    <div
      style={{
        position: "fixed", left: 0, right: 0, height: 2, top: 0,
        background: `linear-gradient(90deg, transparent 0%, var(--color-accent) 30%, var(--color-accent) 70%, transparent 100%)`,
        opacity, pointerEvents: "none", zIndex: 9999,
        animation: `anti-scan ${speed}s linear infinite`,
        boxShadow: `0 0 6px var(--color-accent), 0 0 16px color-mix(in srgb, var(--color-accent) 50%, transparent)`,
      }}
    />
  );
}