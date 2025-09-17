export type HoursByDay = Partial<Record<"mon"|"tue"|"wed"|"thu"|"fri"|"sat"|"sun", string>>;

export type Promo = { 
  label: string; 
  url?: string; 
};

export type EventItem = { 
  title: string; 
  date?: string; 
  time?: string; 
  location?: string; 
  url?: string; 
};

export type Business = {
  id: string;
  name: string;
  category?: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: HoursByDay;
  promos?: Promo[];
  events?: EventItem[];
  lastScrapedAt?: string;
};

export type Plaza = { 
  plazaName: string; 
  lastUpdated: string; 
  businesses?: Business[]; 
  businessFiles?: string[]; 
};

export type SearchFilters = {
  query: string;
  category: string;
  openNow: boolean;
  hasPromo: boolean;
};

export type ViewMode = 'grid' | 'table';
