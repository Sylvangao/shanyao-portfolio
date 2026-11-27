import type { Metadata } from 'next';
import { YunjiCaseStudy } from '../yunji-case-study';
import { notFound } from 'next/navigation';
import { projects } from '../../project-data';
import { ProjectDetailClient } from './project-detail-client';

export function generateStaticParams() {
  return [...projects.map(({ slug }) => ({ slug })), { slug: 'product-experience' }];
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === 'yunji' || slug === 'product-experience') return <YunjiCaseStudy />;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === 'yunji' || slug === 'product-experience')
    return {
      title: '云迹 Yunji — Shanyao',
      description: '企业内容协作产品的早期体验设计：将文档、任务与智能表格组织进统一工作空间。',
    };
  const project = projects.find((item) => item.slug === slug);
  return { title: `${project?.en ?? 'Project'} — Shanyao` };
}
