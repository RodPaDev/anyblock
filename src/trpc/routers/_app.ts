import { messagesRouter } from "@/modules/messages/server/procedure";
import { createTRPCRouter } from "../init";
import { projectsRouter } from "@/modules/projects/server/procedure";

export const appRouter = createTRPCRouter({
  message: messagesRouter,
  projects: projectsRouter
});

export type AppRouter = typeof appRouter;
