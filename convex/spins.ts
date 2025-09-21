import { mutation, query } from "./_generated/server";

function weightedChoice<T extends { weight: number }>(items: T[]): number {
  const total = items.reduce((acc, i) => acc + Math.max(0, i.weight), 0);
  if (total <= 0) return -1;
  const r = Math.random() * total;
  let acc = 0;
  for (let i = 0; i < items.length; i++) {
    acc += Math.max(0, items[i].weight);
    if (r < acc) return i;
  }
  return items.length - 1;
}

export const spin = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    // 50% chance to win
    const isWin = Math.random() < 0.5;

    const now = Date.now();

    if (!isWin) {
      const id = await ctx.db.insert("spins", {
        userId,
        outcome: "keep",
        createdAt: now,
      });
      return { outcome: "keep" as const, spinId: id };
    }

    const prizes = await ctx.db
      .query("prizes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    if (!prizes.length) {
      // If no prizes exist, treat as a keep
      const id = await ctx.db.insert("spins", {
        userId,
        outcome: "keep",
        createdAt: now,
      });
      return { outcome: "keep" as const, spinId: id };
    }

    const idx = weightedChoice(prizes);
    if (idx < 0) {
      const id = await ctx.db.insert("spins", {
        userId,
        outcome: "keep",
        createdAt: now,
      });
      return { outcome: "keep" as const, spinId: id };
    }

    const prize = prizes[idx]!;
    const spinId = await ctx.db.insert("spins", {
      userId,
      outcome: "win",
      prizeId: prize._id,
      prizeName: prize.name,
      createdAt: now,
    });

    return {
      outcome: "win" as const,
      prize: { id: prize._id, name: prize.name, weight: prize.weight },
      spinId,
    };
  },
});

export const recent = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const userId = identity.subject;
    return await ctx.db
      .query("spins")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(20);
  },
});
