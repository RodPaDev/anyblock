import { db } from "@/db";
import { messageTable } from "@/db/schema/message.model";
import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const messages = await db.query.messageTable.findMany({
      with: {
        fragment: true,
      },
      orderBy: (t, { desc }) => desc(t.createdAt),
    });
    return messages;
  }),
  create: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1, "Project ID is required"),
        value: z.string().min(1, "Message cannot be empty"),
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
        data: { value: input.value },
      });

      return createdMsg;
    }),
});
