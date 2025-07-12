"use client";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";

export function ProjectList() {
  const trpc = useTRPC();
  const { data: projects, isLoading } = useQuery(
    trpc.projects.getMany.queryOptions()
  );

  return (
    <div className="w-full bg-background dark:bg-black rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">Your Anyblocks</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">
              You haven't created any Anyblocks yet. Start by building your
              first one!
            </p>
          </div>
        )}
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant="outline"
            className="font-normal h-auto justify-start w-full text-start p-4 "
            asChild
          >
            <Link className="bg-background! border-border! hover:bg-muted!" href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4">
                <Logo size={32} className="object-contain" />
                <div className="flex flex-col">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(project.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
