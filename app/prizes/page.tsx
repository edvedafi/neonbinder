"use client";

import { useEffect, useMemo, useState } from "react";
import { useConvex, useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function useIsMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export default function PrizesPage() {
  const mounted = useIsMounted();
  const convex = useConvex();

  const prizes = useQuery("prizes:list", {}) as
    | { _id: string; name: string; weight: number }[]
    | undefined;

  const upsert = useMutation("prizes:upsert");
  const remove = useMutation("prizes:remove");

  const [name, setName] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sorted = useMemo(() => {
    return (prizes ?? []).slice().sort((a, b) => a.name.localeCompare(b.name));
  }, [prizes]);

  if (!mounted) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || weight === "" || Number.isNaN(Number(weight))) return;
    try {
      setError(null);
      await upsert({ id: editingId ?? undefined, name: name.trim(), weight: Number(weight) });
      setName("");
      setWeight("");
      setEditingId(null);
    } catch (e: any) {
      console.error(e);
      setError("You must be signed in to manage prizes. Please sign in and try again.");
    }
  };

  const onEdit = (p: { _id: string; name: string; weight: number }) => {
    setEditingId(p._id);
    setName(p.name);
    setWeight(p.weight);
  };

  const onDelete = async (id: string) => {
    await remove({ id });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.75)]">Prize Weights</h1>
        <p className="mt-2 text-slate-300">Manage your prize names and weights. Higher weight = more likely to be chosen on a winning spin.</p>

        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 sm:grid-cols-6 gap-4 rounded-xl border border-emerald-600/30 bg-slate-900/60 p-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <div className="sm:col-span-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Prize name" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="weight">Weight</Label>
            <Input
              id="weight"
              type="number"
              min={0}
              step={1}
              value={weight}
              onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder="e.g. 10"
            />
          </div>
          <div className="sm:col-span-1 flex items-end">
            <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 shadow-[0_0_25px_#34d399]">
              {editingId ? "Save" : "Add"}
            </Button>
          </div>
        </form>

        <div className="mt-8 divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40">
          <div className="grid grid-cols-12 gap-4 px-4 py-3 text-sm font-semibold text-slate-300">
            <div className="col-span-7">Name</div>
            <div className="col-span-3">Weight</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {(sorted ?? []).map((p) => (
            <div key={p._id} className="grid grid-cols-12 gap-4 px-4 py-3 items-center">
              <div className="col-span-7 truncate">{p.name}</div>
              <div className="col-span-3">{p.weight}</div>
              <div className="col-span-2 flex justify-end gap-2">
                <Button variant="outline" className="border-emerald-500/60 text-emerald-300 hover:bg-emerald-500/10" onClick={() => onEdit(p)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => onDelete(p._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          {!sorted?.length && (
            <div className="px-4 py-8 text-center text-slate-400">No prizes yet. Add your first prize above.</div>
          )}
        </div>

        <div className="mt-10 text-sm text-slate-400">
          Tip: The wheel has a 50% chance to be a non-winning spin ("Keep your Card"). When it is a winning spin, the prize is chosen using your weights above.
        </div>
      </div>
    </div>
  );
}
