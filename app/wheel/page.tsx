"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useConvex, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";

type Prize = { _id: string; name: string; weight: number };

type SpinResult =
  | { outcome: "keep"; spinId: string }
  | { outcome: "win"; spinId: string; prize: { id: string; name: string; weight: number } };

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export default function WheelPage() {
  const mounted = useIsMounted();
  const convex = useConvex();
  const prizes = useQuery("prizes:list", {}) as Prize[] | undefined;
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement | null>(null);

  const labels = useMemo(() => {
    const winLabels = (prizes ?? []).map((p) => p.name);
    const count = 12; // total segments
    const arr: string[] = [];
    for (let i = 0; i < count; i++) {
      if (i % 2 === 0) arr.push("Keep your Card");
      else arr.push(winLabels[(i / 2) % Math.max(1, winLabels.length)] ?? "Prize");
    }
    return arr;
  }, [prizes]);

  const spin = async () => {
    if (spinning) return;
    setResult(null);
    setSpinning(true);

    const extraSpins = 6 + Math.floor(Math.random() * 4); // 6-9 spins
    const finalDeg = rotation + extraSpins * 360 + Math.floor(Math.random() * 360);
    setRotation(finalDeg);

    let serverResult: SpinResult | null = null;
    try {
      setError(null);
      serverResult = (await convex.mutation("spins:spin", {})) as unknown as SpinResult;
    } catch (e: any) {
      console.error(e);
      setError("You must be signed in to spin. Please sign in and try again.");
      setSpinning(false);
      return;
    }

    // Wait for CSS spin to finish (match transition time)
    setTimeout(() => {
      setResult(serverResult);
      setSpinning(false);
    }, 2500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-10">
        <h1 className="text-4xl font-extrabold tracking-wider text-emerald-400 drop-shadow-[0_0_18px_rgba(16,185,129,0.85)]">
          Neon Prize Wheel
        </h1>
        <p className="mt-2 text-slate-300">50% chance to land on "Keep your Card". Winners are chosen by weighted odds.</p>
        <a href="/prizes" className="mt-2 text-emerald-300 underline underline-offset-4">Manage prizes</a>

        <div className="relative mt-10 flex items-center justify-center">
          <div
            ref={wheelRef}
            className="relative h-[420px] w-[420px] rounded-full border-4 border-emerald-500/60 bg-[conic-gradient(var(--seg1),var(--seg1)_0_15%,transparent_15%_50%,var(--seg2)_50%_65%,transparent_65%_100%)] shadow-[0_0_40px_#34d399,0_0_80px_#34d399_inset]"
            style={{
              // Spin animation
              transition: "transform 2.5s cubic-bezier(0.22, 1, 0.36, 1)",
              transform: `rotate(${rotation}deg)`
            }}
          >
            <SegmentLabels labels={labels} />
          </div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-emerald-400 drop-shadow-[0_0_12px_#34d399]">
            ▲
          </div>
        </div>

        <Button
          onClick={spin}
          disabled={spinning}
          className="mt-8 bg-emerald-500 text-slate-900 hover:bg-emerald-400 shadow-[0_0_25px_#34d399]"
        >
          {spinning ? "Spinning..." : "Spin"}
        </Button>

        {error && (
          <div className="mt-6 max-w-xl rounded-md border border-red-500/40 bg-red-500/10 px-4 py-3 text-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-10 w-full max-w-xl rounded-2xl border border-emerald-600/30 bg-slate-900/60 p-6 text-center shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            {result.outcome === "keep" ? (
              <div>
                <div className="text-3xl font-extrabold tracking-wide text-emerald-400 drop-shadow-[0_0_18px_#34d399]">
                  Keep your Card
                </div>
                <div className="mt-2 text-slate-300">No prize this time. Try again!</div>
              </div>
            ) : (
              <div>
                <div className="text-3xl font-extrabold tracking-wide text-emerald-400 drop-shadow-[0_0_18px_#34d399]">
                  Winner!
                </div>
                <div className="mt-2 text-slate-200">
                  You won: <span className="font-semibold text-emerald-300">{result.prize.name}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <RecentSpins />
      </div>

      <style>{`:root{--seg1:#0f172a;--seg2:#022c22}`}</style>
    </div>
  );
}

function SegmentLabels({ labels }: { labels: string[] }) {
  const radius = 180; // label radius
  const count = labels.length;
  return (
    <div className="pointer-events-none select-none">
      {labels.map((label, i) => {
        const angle = (i / count) * 360;
        const rad = (angle * Math.PI) / 180;
        const x = 210 + radius * Math.cos(rad);
        const y = 210 + radius * Math.sin(rad);
        const rotate = angle + 90;
        const isKeep = i % 2 === 0;
        return (
          <div
            key={i}
            className={`absolute left-0 top-0 w-0 text-xs sm:text-sm ${isKeep ? "text-slate-300" : "text-emerald-300"}`}
            style={{ transform: `translate(${x}px, ${y}px) rotate(${rotate}deg)` }}
          >
            <span className="drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

function RecentSpins() {
  const spins = useQuery("spins:recent", {}) as
    | { _id: string; outcome: "win" | "keep"; prizeName?: string; createdAt: number }[]
    | undefined;

  if (!spins || !spins.length) return null;

  return (
    <div className="mx-auto mt-10 w-full max-w-3xl overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40">
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-slate-300">
        <div className="col-span-7">Result</div>
        <div className="col-span-5">When</div>
      </div>
      {spins.map((s) => (
        <div key={s._id} className="grid grid-cols-12 gap-4 px-4 py-3">
          <div className="col-span-7">
            {s.outcome === "keep" ? (
              <span className="text-slate-300">Keep your Card</span>
            ) : (
              <span className="text-emerald-300">Won {s.prizeName}</span>
            )}
          </div>
          <div className="col-span-5 text-slate-400">{new Date(s.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
