import Logo from "@/components/logo";
import { ProjectForm } from "@/modules/home/ui/components/project-form";
import { ProjectList } from "@/modules/home/ui/components/project-list";

export default function Page() {
  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full">
      <section className="space-y-6 py-[16vh] 2xl:py-48">
        <div className="flex flex-col items-center">
          <Logo size={123} />
        </div>
        <h1 className="text-2xl md:text-5xl font-semibold text-center uppercase tracking-widest font-mono">
          Anyblock
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground text-center">
          Build once, convert anywhere. Frameworks are now interoperable.
        </p>
        <div className="max-w-3xl mx-auto w-full">
          <ProjectForm />
        </div>
      </section>
      <ProjectList />
    </div>
  );
}
