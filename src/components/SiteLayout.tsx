import type { ReactNode } from 'react';
import Seo from './Seo';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { SEO_OG_IMAGE, SEO_OG_IMAGE_ALT } from '../data/siteConfig';

interface SiteLayoutProps {
  title: string;
  description: string;
  path: string;
  bodyClass?: string;
  hero?: ReactNode;
  children: ReactNode;
  mainClassName?: string;
  ogImage?: string;
  ogImageAlt?: string;
  robots?: string;
  ogType?: string;
}

export default function SiteLayout({
  title,
  description,
  path,
  bodyClass,
  hero,
  children,
  mainClassName,
  ogImage = SEO_OG_IMAGE,
  ogImageAlt = SEO_OG_IMAGE_ALT,
  robots,
  ogType,
}: SiteLayoutProps) {
  return (
    <>
      <Seo
        title={title}
        description={description}
        path={path}
        bodyClass={bodyClass}
        image={ogImage}
        imageAlt={ogImageAlt}
        robots={robots}
        ogType={ogType}
      />
      <SiteHeader />
      {hero}
      <main className={mainClassName}>{children}</main>
      <SiteFooter />
    </>
  );
}
