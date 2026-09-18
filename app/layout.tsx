import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase:new URL('https://shanyao-portfolio.pages.dev'),
  title:'Shanyao — Designer',
  description:'Thoughtful design for useful things. Portfolio of Shanyao, an independent designer.',
  icons:{ icon:`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`, shortcut:`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg` },
  openGraph:{ title:'Shanyao — Designer', description:'Thoughtful design for useful things.', type:'website', images:['/og.png'] },
  twitter:{ card:'summary_large_image', title:'Shanyao — Designer', description:'Thoughtful design for useful things.', images:['/og.png'] },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
