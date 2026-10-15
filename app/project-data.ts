type Project = {
  slug: string;
  en: string;
  zh: string;
  tone: string;
  cover?: string;
  labels: string[];
};

export const projects: readonly Project[] = [
  {
    slug: 'product-experience',
    en: 'Product experience',
    zh: '产品体验设计',
    labels: ['SaaS', 'Product', 'Design system'],
    tone: 'blue',
  },
  {
    slug: 'brand-identity',
    en: 'Brand identity',
    zh: '品牌焕新',
    labels: ['Branding', 'Visual design'],
    tone: 'coral',
  },
  {
    slug: 'digital-service',
    en: 'Digital service',
    zh: '数字化服务',
    labels: ['Website', 'Product'],
    tone: 'green',
  },
  {
    slug: 'enterprise-product',
    en: 'Enterprise product',
    zh: '企业产品',
    labels: ['SaaS', 'Enterprise', 'Design system'],
    tone: 'violet',
  },
  {
    slug: 'growth-experience',
    en: 'Growth experience',
    zh: '增长体验',
    labels: ['Product', 'Growth'],
    tone: 'amber',
  },
  {
    slug: 'ai-product',
    en: 'AI product',
    zh: 'AI 产品',
    labels: ['AI', 'Product', 'SaaS'],
    tone: 'cyan',
  },
] as const;
