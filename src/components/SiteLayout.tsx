import type { ReactNode } from 'react';
import Seo from './Seo';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import ConstructionBanner from './ConstructionBanner';
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
  keywords?: string;
  robots?: string;
  ogType?: string;
  constructionBanner?: boolean;
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
  keywords,
  robots,
  ogType,
  constructionBanner = false,
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
        keywords={keywords}
        robots={robots}
        ogType={ogType}
      />
      <div className={constructionBanner ? 'site-shell site-shell--construction' : 'site-shell'}>
        {constructionBanner && <ConstructionBanner />}
        <SiteHeader />
        {hero}
        <main className={mainClassName}>{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
