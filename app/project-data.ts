type Project = { slug:string; en:string; zh:string; tone:string; cover?:string; labels:string[] };

export const projects: readonly Project[] = [
  { slug: 'product-experience', en: 'Product experience', zh: '产品体验设计', labels: ['SaaS'], tone: 'blue' },
  { slug: 'brand-identity', en: 'Brand identity', zh: '品牌焕新', labels: ['SaaS'], tone: 'coral' },
  { slug: 'digital-service', en: 'Digital service', zh: '数字化服务', labels: ['SaaS'], tone: 'green' },
  { slug: 'enterprise-product', en: 'Enterprise product', zh: '企业产品', labels: ['SaaS'], tone: 'violet' },
  { slug: 'growth-experience', en: 'Growth experience', zh: '增长体验', labels: ['SaaS'], tone: 'amber' },
  { slug: 'ai-product', en: 'AI product', zh: 'AI 产品', labels: ['SaaS'], tone: 'cyan' },
] as const;
