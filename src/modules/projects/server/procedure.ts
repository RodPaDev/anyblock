import { db } from "@/db";
import { messageTable } from "@/db/schema/message.model";
import { projectTable } from "@/db/schema/project.model";
import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";

export const projectsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const projects = await db.query.projectTable.findMany({
      with: {
        messages: true,
      },
      orderBy: (t, { desc }) => desc(t.createdAt),
    });
    return projects;
  }),
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, "Value cannot be empty").max(10000, "Value is too long"),
      })
    )
    .mutation(async ({ input }) => {
      const [createdProject] = await db
        .insert(projectTable)
        .values({
          name: generateSlug(2, { format: "kebab" }),
        })
        .returning();

      const createdMsg = await db.insert(messageTable).values({
        content: input.value,
        role: "user",
        type: "result",
        projectId: createdProject.id,
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          projectId: createdProject.id,
          value: input.value,
        },
      });

      return createdProject
    }),
});
