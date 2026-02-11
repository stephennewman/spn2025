export interface SiteConfig extends HeaderProps {
  title: string;
  description: string;
  lang: string;
  author: string;
  socialLinks: { text: string; href: string }[];
  socialImage: string;
  canonicalURL?: string;
}

export interface SiteContent {
  hero: HeroProps;
  metrics: MetricProps[];
  highlights: HighlightProps[];
  experience: ExperienceProps[];
  projects: ProjectProps[];
  education: EducationProps[];
  about: AboutProps;
}

export interface HeroProps {
  name: string;
  title: string;
  summary: string;
  email: string;
}

export interface MetricProps {
  value: string;
  label: string;
}

export interface HighlightProps {
  company: string;
  role: string;
  period: string;
  outcome: string;
  highlight: string;
}

export interface ExperienceProps {
  company: string;
  location: string;
  position: string;
  startDate: string;
  endDate: string;
  summary: string | string[];
}

export interface ProjectProps {
  name: string;
  summary: string;
  image: string;
  linkPreview?: string;
  linkSource?: string;
}

export interface EducationProps {
  degree: string;
  field: string;
  school: string;
  year: string;
}

export interface AboutProps {
  description: string;
  image: string;
}

export interface HeaderProps {
  siteLogo: string;
  navLinks: { text: string; href: string }[];
  ctaButton?: { text: string; href: string };
}
