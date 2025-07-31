import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Stephen Newman — Marketing Executive & Business Leader",
  author: "Stephen Newman",
  description:
    "Revenue focused B2B professional with experience working for high-growth technology companies. Passionate about building, optimizing, and scaling high-growth go-to-market engines.",
  lang: "en",
  siteLogo: "/stephen_newman.jpeg",
  navLinks: [
    { text: "Experience", href: "#experience" },
    { text: "Education", href: "#education" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    { text: "Email", href: "mailto:stephen.p.newman@gmail.com" },
    { text: "LinkedIn", href: "http://www.linkedin.com/in/stephennewman1" },
    { text: "Phone", href: "tel:617.347.2721" },
  ],
  socialImage: "/stephen_newman.jpeg",
  canonicalURL: "https://stephennewman.me",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Stephen Newman",
    specialty: "Marketing Professional & Executive Business Leader",
    summary:
      "Customer centric marketing and business professional based in Palm Harbor, Florida. I specialize in revenue performance management, product innovation, business process optimization, and much more. Currently exploring what's out there knowing my adaptability talents would be a great addition to any size team at any stage.",
    email: "stephen.p.newman@gmail.com",
  },
  experience: [
    {
      company: "Checkit",
      companyIcon: "/checkit_logo.jpeg",
      position: "Head of Marketing",
      startDate: "Feb 2024",
      endDate: "Present",
      summary: [
        "Recruited to run global marketing for a publicly traded temperature monitoring and workflow automation company based in London, England.",
        "Currently leading all marketing activities as a team of one - website, lead generation, messaging & positioning, sales enablement, market research, and much more.",
        "Recently found traction exploring new markets in the senior living space, adding more than $5 million in net new pipeline in less than 6 months.",
        "In the process of rebuilding the company's operational processes and positioning to distinguish Checkit from the other vendors with an emphasis on 'Predictive Operations' messaging.",
        "Still actively employed and working hard.",
      ],
    },
    {
      company: "Krezzo",
      companyIcon: "/krezzo_logo.jpeg",
      position: "Founder & CEO",
      startDate: "Jan 2021",
      endDate: "Jan 2024",
      summary: [
        "Founded Krezzo to bring better experience with Objectives & Key Results (OKRs) to B2B SaaS companies and operational leaders.",
        "Raised over $500,000 across 12 investors and built an integrated SaaS and training product.",
        "Signed 8 B2B customers across 12 deals, generating $77,400 in revenue.",
        "Attempted pivot in 2023 to an AI-powered voice-to-text automation platform, but seized full-time operations due to market dynamics.",
        "Gained oceans of experience across fundraising, product, engineering, operations, finance, legal, sales, and more.",
      ],
    },
    {
      company: "Form.com",
      companyIcon: "/form_com_logo.jpeg",
      position: "VP of Marketing",
      startDate: "Nov 2018",
      endDate: "Dec 2020",
      summary: [
        "Responsible for all global marketing and business development efforts.",
        "Managed a $2.5 million budget and a team of 20+ marketers and BDRs.",
        "Focused on attracting enterprise-level customers, optimizing the channel mix, and working closely with sales.",
        "Promoted from Director of Demand Generation after delivering positive results in less than three months.",
        "Involved in leadership group who was successfully acquired by private equity firm for almost $40 million",
      ],
    },
    {
      company: "Thought Industries",
      companyIcon: "/thought_industries_logo.jpeg",
      position: "Director of Marketing",
      startDate: "Nov 2015",
      endDate: "Jul 2018",
      summary: [
        "Hired as company's first marketer and 15th employee, helped scale to almost 50 employees and $9 million ARR.",
        "Managed global marketing budget of over $1 million across PPC, Pay-Per-Lead, and partner channels with 45% attribution rate.",
        "Improved lead generation from 20 leads per month to over 500 in 24 months, maintaining high quality with 30% handoff rate.",
        "Marketing sourced opportunity pipeline reached almost $50 million.",
        "Selected by co-founders for annual 'Ownership Award' and added to Leadership Team in 2017.",
      ],
    },
    {
      company: "Aras Corporation",
      companyIcon: "/aras_corporation_logo.jpeg",
      position: "Marketing Programs Manager",
      startDate: "Dec 2013",
      endDate: "Oct 2015",
      summary: [
        "Managed all North American marketing programs while focusing on improvement of internal sales and marketing operations.",
        "Handled quarterly paid media plan including testing and optimizing paid search, retargeting, display advertising and paid email.",
        "Managed implementation of marketing automation platform to boost user engagement and track anonymous web visitors.",
        "Contributed to biggest bookings increase in company's 15-year history, growing from $11 million to $21 million year over year.",
        "Pipeline increased from $60 million to $156 million in only 20 months.",
      ],
    },
    {
      company: "Oracle",
      companyIcon: "/oracle_logo.jpeg",
      position: "Field Marketing Manager",
      startDate: "Mar 2012",
      endDate: "Nov 2013",
      summary: [
        "Managed field marketing programs and events to support Northeast enterprise sales teams and business development counterparts.",
        "Developed deal acceleration and conversion strategies to help move prospects through the buying cycle.",
        "Served as marketing liaison for six Enterprise Applications Sales Managers, three BDRs, and one regional VP.",
        "Used Eloqua marketing automation platform to create multi-touch campaigns for new rep onboarding.",
        "Worked with internal marketing teams to build integrated campaigns, events, and programs for external use.",
      ],
    },
    {
      company: "D50 Media",
      companyIcon: "/d50_media_logo.jpeg",
      position: "Marketing Manager / Search Engine Specialist",
      startDate: "Jul 2011",
      endDate: "Feb 2012",
      summary: [
        "Managed every aspect of multiple national affiliate marketing partnerships while tracking and reporting on the quality of leads from vendors.",
        "Recruited new affiliates and partners and implemented trial campaigns to assess quality. Affiliate marketing became the most cost effective channel for MQLs compared to SEO, SEM and Social.",
        "Managed an annual paid search budget of over $800,000 across both Google Adwords and Microsoft Adcenter platforms.",
        "Created, managed and analyzed paid search programs to ensure acquisition and conversion goals were met.",
        "Handled keyword list generation, ad copy writing, bid management, landing page optimization and budget management.",
      ],
    },
  ],
  projects: [],
  education: [
    {
      degree: "MBA",
      field: "International Business",
      school: "Liberty University",
      year: "2010-2012",
    },
    {
      degree: "Bachelor of Arts",
      field: "Communications",
      school: "Eastern Nazarene",
      year: "2004-2008",
    },
  ],
  about: {
    description: `
      Passionate about building, optimizing, and scaling high-growth revenue generating engines that promote innovative products and delightful experiences for customers. Capable of building products from the ground up, expanding or creating markets, and operationalizing processes for simplicity, efficiency and effectiveness. Whether it's a start-up in need of a jack-of-all-trades hands on doer, or a larger corporation wanting to get strategic and position themselves for the next chapter, I'm your guy. Currently living in Palm Harbor, Florida with my wife and three girls. Enjoys playing golf, boating, and going to the beach, to name a few.
    `,
    image: "/stephen_newman.jpeg",
  },
};

// Pink-Purple Gradient: #ec4899 to #8b5cf6