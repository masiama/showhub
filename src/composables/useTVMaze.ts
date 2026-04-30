import { createFetch } from "@vueuse/core";
import type z from "zod";

const useFetch = createFetch({ baseUrl: "https://api.tvmaze.com" });

export const useTVMaze = <T>(endpoint: string, schema: z.ZodSchema<T>) =>
  useFetch(endpoint, {
    afterFetch(ctx) {
      const result = schema.safeParse(ctx.data);
      if (!result.success) {
        console.error("Failed to parse response:", result.error);
        throw new Error("Invalid API response format");
      }
      ctx.data = result.data;
      return ctx;
    },
  })
    .get()
    .json<T>();
