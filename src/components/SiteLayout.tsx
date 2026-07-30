import type { ReactNode } from 'react';
import Seo from './Seo';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

interface SiteLayoutProps {
  title: string;
  description: string;
  path: string;
  bodyClass?: string;
  hero?: ReactNode;
  children: ReactNode;
  mainClassName?: string;
  ogImage?: string;
}

export default function SiteLayout({
  title,
  description,
  path,
  bodyClass,
  hero,
  children,
  mainClassName,
  ogImage = '/images/logo.png',
}: SiteLayoutProps) {
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        bodyClass={bodyClass}
        image={ogImage}
      />
      <SiteHeader />
      {hero}
      <main className={mainClassName}>{children}</main>
      <SiteFooter />
    </>
  );
}
