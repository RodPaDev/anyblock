import ProjectView from "@/modules/projects/ui/views/project-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
    params: {
        projectId: string;
    };
}

export default async function Page({ params }: Props) {
    const { projectId } =  params;

    const queryClient =  getQueryClient()
    void queryClient.prefetchQuery(trpc.projects.getOne.queryOptions({
        projectId
    }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
              <ProjectView projectId={projectId} />
          </Suspense>
        </HydrationBoundary>
    );

}