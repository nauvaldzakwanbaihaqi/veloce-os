import { PageHeader } from "@/components/layout/page-header";
import { ProjectTable } from "@/components/project/project-table";
import { ProjectForm } from "@/components/project/project-form";
import { getProjects } from "@/lib/actions/project";
import { getClients } from "@/lib/actions/client";

export default async function ProjectsPage() {
  const [projects, clients] = await Promise.all([
    getProjects(),
    getClients(),
  ]);

  return (
    <>
      <PageHeader
        title="Projects"
        description="Kelola proyek-proyek Anda di sini."
        action={<ProjectForm clients={clients} />}
      />
      <div className="p-4">
        <ProjectTable projects={projects} />
      </div>
    </>
  );
}
