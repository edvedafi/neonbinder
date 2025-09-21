import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const userId = identity.subject;
    return await ctx.db
      .query("prizes")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("asc")
      .collect();
  },
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("prizes")),
    name: v.string(),
    weight: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    const now = Date.now();

    if (args.id) {
      const existing = await ctx.db.get(args.id);
      if (!existing || existing.userId !== userId) {
        throw new Error("Prize not found");
      }
      await ctx.db.patch(args.id, {
        name: args.name,
        weight: args.weight,
        updatedAt: now,
      });
      return args.id;
    }

    const id = await ctx.db.insert("prizes", {
      userId,
      name: args.name,
      weight: args.weight,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },
});

export const remove = mutation({
  args: { id: v.id("prizes") },
  handler: async (ctx, { id }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    const existing = await ctx.db.get(id);
    if (!existing || existing.userId !== userId) {
      throw new Error("Prize not found");
    }
    await ctx.db.delete(id);
  },
});
