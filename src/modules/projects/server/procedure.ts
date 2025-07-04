import { db } from "@/db";
import { messageTable } from "@/db/schema/message.model";
import { projectTable } from "@/db/schema/project.model";
import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
    getOne: baseProcedure
    .input(
      z.object({
        projectId: z.string().min(1, "Project ID is required"),
      })
    )
    .query(async ({input}) => {
    const project = await db.query.projectTable.findFirst({
      where: (t, { eq }) => eq(t.id, input.projectId),
      with: {
        messages: true,
      }
    });

    if (!project) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Project not found",
      })
    }

    return project;
  }),
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
