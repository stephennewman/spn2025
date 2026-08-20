import type { SiteConfig, SiteContent } from "../types";

export const SITE_CONFIG: SiteConfig = {
  title: "Stephen Newman | GTM Executive & Growth Marketer",
  author: "Stephen Newman",
  description:
    "GTM Executive & Growth Marketer. Builder of pipeline engines and advanced AI operator. 15+ years leading marketing, sales alignment, technology, and operational strategy, with multiple exits, acquisitions, and an IPO.",
  lang: "en",
  siteLogo: "/stephen_newman.jpeg",
  navLinks: [
    { text: "Track Record", href: "#highlights" },
    { text: "Experience", href: "#experience" },
    { text: "About", href: "#about" },
  ],
  socialLinks: [
    { text: "Email", href: "mailto:stephen.p.newman@gmail.com" },
    { text: "LinkedIn", href: "http://www.linkedin.com/in/stephennewman1" },
    { text: "Phone", href: "tel:617.347.2721" },
  ],
  socialImage: "/stephen_newman.jpeg",
  canonicalURL: "https://www.stephennewman.me",
};

export const SITE_CONTENT: SiteContent = {
  hero: {
    name: "Stephen Newman",
    title: "Marketing & Revenue Growth Executive",
    summary:
      "Scaling go-to-market engines for high-growth tech and SaaS companies. 15+ years leading marketing, sales alignment, and operational strategy. Early adopter of AI-driven business tools with a track record of multiple exits, acquisitions, and an IPO.",
    email: "stephen.p.newman@gmail.com",
  },
  metrics: [
    { value: "15+", label: "Years Experience" },
    { value: "4", label: "Acquisitions & Exits" },
    { value: "$156M", label: "Pipeline Generated" },
    { value: "25x", label: "Lead Generation Growth" },
  ],
  highlights: [
    {
      company: "Eloqua",
      role: "Field Marketing Manager",
      period: "2012–2013",
      outcome: "IPO → Acquired by Oracle",
      highlight:
        "Supported enterprise sales through multi-touch campaigns and marketing automation during the company's IPO and subsequent Oracle acquisition.",
    },
    {
      company: "Aras Corp",
      role: "Marketing Programs Manager",
      period: "2013–2015",
      outcome: "Acquired by GI Partners",
      highlight:
        "Grew pipeline from $60M to $156M in 20 months. Implemented marketing automation and segmentation strategies across North America.",
    },
    {
      company: "Thought Industries",
      role: "Director of Marketing",
      period: "2015–2018",
      outcome: "Acquired by Luminate Capital",
      highlight:
        "First marketing hire. Scaled from 15 to 50 employees and $9M ARR. Built inbound engine from <20 to 500+ leads/month.",
    },
    {
      company: "Form.com",
      role: "VP of Marketing",
      period: "2018–2020",
      outcome: "Acquired by Diversis Capital",
      highlight:
        "Promoted to VP within 90 days. Managed $2.5M budget and 20+ team across global marketing and BDRs.",
    },
  ],
  experience: [
    {
      company: "Checkit",
      location: "London, UK",
      position: "Head of Marketing",
      startDate: "Feb 2024",
      endDate: "Present",
      logo: "/checkit_logo.svg",
      chips: [
        { label: "Outbound", type: "channel" },
        { label: "AI Search", type: "channel" },
        { label: "Publicly traded", type: "status" },
        { label: "Achieved profitability", type: "highlight" },
      ],
      summary: [
        "Recruited to run global marketing and \"get profitable\", which was achieved in 2026.",
        "Repositioned company from compliance/checklist tools to predictive operations, leveraging AI-driven insights for enterprise clients and multi-site locations.",
        "Stacked GTM US resources (exec, sales, marketing, product, SDR) on the senior living sector and generated $5M+ new pipeline in 6 months.",
      ],
    },
    {
      company: "Krezzo",
      location: "Palm Harbor, FL",
      position: "Founder & CEO",
      startDate: "Jan 2021",
      endDate: "Jan 2024",
      logo: "/krezzo_logo.png",
      chips: [
        { label: "LinkedIn", type: "channel" },
        { label: "Referrals", type: "channel" },
        { label: "Startup", type: "status" },
        { label: "Raised capital + built product", type: "highlight" },
      ],
      summary: [
        "Founded SaaS company focused on OKRs and operational performance, later pivoting to AI-powered voice-to-text automation.",
        "Raised $530K from 12 investors; built multiple products and prototypes.",
        "Closed 12 customer deals, generating $77K ARR with multiple renewals.",
      ],
    },
    {
      company: "Form.com",
      location: "Braintree, MA",
      position: "VP of Marketing",
      startDate: "Nov 2018",
      endDate: "Dec 2020",
      logo: "/form_logo.png",
      chips: [
        { label: "Google PPC", type: "channel" },
        { label: "Capterra", type: "channel" },
        { label: "Inbound", type: "channel" },
        { label: "Outbound", type: "channel" },
        { label: "Acquired by PE", type: "status" },
        { label: "Fixed the digital funnel", type: "highlight" },
      ],
      summary: [
        "Promoted to VP within 90 days after joining as Director of Demand Generation.",
        "Managed $2.5M marketing budget and 20+ team across global marketing and BDRs.",
        "Member of Executive Leadership Team; company acquired by Diversis Capital.",
      ],
    },
    {
      company: "Thought Industries",
      location: "Boston, MA",
      position: "Director of Marketing",
      startDate: "Nov 2015",
      endDate: "Jul 2018",
      logo: "/ti_logo.webp",
      chips: [
        { label: "Capterra", type: "channel" },
        { label: "Inbound", type: "channel" },
        { label: "Acquired by PE", type: "status" },
        { label: "Built marketing + BDR foundation & scaled it", type: "highlight" },
      ],
      summary: [
        "First marketing hire; scaled company from 15 to 50 employees and <$1M to ~$10M ARR without venture funding.",
        "Built inbound engine: increased leads from <20 to 500+/month; inbound contributed 80% of pipeline and ultimately revenue.",
        "Recognized with 'Ownership Award' by founders, who later became investors in Krezzo; company acquired by Luminate Capital.",
      ],
    },
    {
      company: "Aras Corp",
      location: "Andover, MA",
      position: "Marketing Programs Manager",
      startDate: "Dec 2013",
      endDate: "Oct 2015",
      logo: "/aras_logo.png",
      chips: [
        { label: "Inbound", type: "channel" },
        { label: "Webinars", type: "channel" },
        { label: "Acquired by PE", type: "status" },
        { label: "Increased lead quality", type: "highlight" },
      ],
      summary: [
        "Oversaw demand generation, analytics, and sales/marketing operations for North America, and successfully championed a push for \"ungating all content\".",
        "Led email platform migration to streamline promotion of a monthly demo series that grew to 200+ registrants a month.",
        "Increased pipeline from $60M to $156M within 20 months; company acquired by GI Partners.",
      ],
    },
    {
      company: "Eloqua",
      location: "Cambridge, MA",
      position: "Field Marketing Manager",
      startDate: "Mar 2012",
      endDate: "Nov 2013",
      logo: "/eloqua_logo.png",
      chips: [
        { label: "Events", type: "channel" },
        { label: "IPO'd", type: "status" },
        { label: "Acquired by Oracle", type: "status" },
        { label: "Supported enterprise reps + BDR counterparts", type: "highlight" },
      ],
      summary: [
        "Supported enterprise sales through events, campaigns, and marketing automation.",
        "Created multi-touch campaigns, outbound prospecting templates, and content-driven programs.",
        "Pipeline driver; involved in IPO and subsequent Oracle acquisition.",
      ],
    },
  ],
  projects: [],
  education: [
    {
      degree: "MBA",
      field: "International Business",
      school: "Liberty University",
      year: "2010–2012",
    },
    {
      degree: "B.A.",
      field: "Communications",
      school: "Eastern Nazarene College",
      year: "2004–2008",
    },
  ],
  about: {
    description:
      "With 15+ years in B2B tech and SaaS, I've led marketing through multiple growth stages, from first marketing hire to managing global teams and multi-million dollar budgets. I've been part of four acquisitions and an IPO, and I'm an early adopter of AI tools for business. Currently leading global marketing at Checkit from Palm Harbor, Florida.",
    image: "/stephen_newman.jpeg",
  },
};
