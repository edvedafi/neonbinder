import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  prizes: defineTable({
    userId: v.string(),
    name: v.string(),
    weight: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]) // filter by user
    .index("by_user_name", ["userId", "name"]),

  spins: defineTable({
    userId: v.string(),
    outcome: v.union(v.literal("win"), v.literal("keep")),
    prizeId: v.optional(v.id("prizes")),
    prizeName: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
