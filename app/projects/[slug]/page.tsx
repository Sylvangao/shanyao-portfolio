import { notFound } from 'next/navigation';
import { projects } from '../../project-data';
import { ProjectDetailClient } from './project-detail-client';

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
