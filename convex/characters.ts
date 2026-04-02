import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("characters")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    const limit = args.limit ?? 10;
    return await ctx.db
      .query("characters")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(limit);
  },
});

export const create = mutation({
  args: {
    prompt: v.string(),
    imageBase64: v.string(),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("characters", {
      userId,
      prompt: args.prompt,
      imageBase64: args.imageBase64,
      name: args.name,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("characters") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const character = await ctx.db.get(args.id);
    if (!character || character.userId !== userId) {
      throw new Error("Character not found");
    }
    await ctx.db.delete(args.id);
  },
});

export const updateName = mutation({
  args: { id: v.id("characters"), name: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    const character = await ctx.db.get(args.id);
    if (!character || character.userId !== userId) {
      throw new Error("Character not found");
    }
    await ctx.db.patch(args.id, { name: args.name });
  },
});
