import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase:new URL('https://shanyao-portfolio.pages.dev'),
  title:'Shanyao — Designer',
  description:'Portfolio of Shanyao, an independent product and visual designer.',
  openGraph:{ title:'Shanyao — Designer', description:'Product, interface and visual design.', type:'website', images:['/og.png'] },
  twitter:{ card:'summary_large_image', title:'Shanyao — Designer', description:'Product, interface and visual design.', images:['/og.png'] },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
