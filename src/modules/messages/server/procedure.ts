import { db } from "@/db";
import { messageTable } from "@/db/schema/message.model";
import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1, "Project ID is required"),
      })
    )
    .query(async ({ input }) => {
      const messages = await db.query.messageTable.findMany({
        where: (t, { eq }) => eq(t.projectId, input.projectId),
        with: {
          fragment: true,
        },
        orderBy: (t, { asc }) => asc(t.createdAt),
      });
      return messages;
    }),
  create: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1, "Project ID is required"),
        value: z.string().min(1, "Value cannot be empty").max(10000, "Value is too long"),
      })
    )
    .mutation(async ({ input }) => {
      const createdMsg = await db.insert(messageTable).values({
        projectId: input.projectId,
        content: input.value,
        role: "user",
        type: "result",
      });

      await inngest.send({
        name: "code-agent/run",
        data: { value: input.value, projectId: input.projectId },
      });

      return createdMsg;
    }),
});
