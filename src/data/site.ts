/**
 * Global site data. Everything here is fictional and for demonstration only.
 */
export const site = {
  name: 'Ember & Oak',
  tagline: 'A Pacific Northwest steakhouse, cooked over fire.',
  description:
    'Ember & Oak is a modern Seattle steakhouse: dry-aged beef, A5 Wagyu, Dungeness crab and Washington wines, cooked over Pacific Northwest oak and cherry wood.',
  // Clearly fictional contact data (555 numbers and .example domains are reserved for demos)
  address: {
    street: '1201 Western Avenue',
    city: 'Seattle',
    region: 'WA',
    postal: '98101',
    country: 'US',
  },
  phone: '(206) 555-0142',
  phoneHref: 'tel:+12065550142',
  email: 'reservations@emberandoak.example',
  events: 'events@emberandoak.example',
  hours: [
    { days: 'Monday', time: 'Closed' },
    { days: 'Tue – Thu', time: '5:00 – 10:00 pm' },
    { days: 'Fri – Sat', time: '5:00 – 11:00 pm' },
    { days: 'Sunday', time: '4:30 – 9:30 pm' },
  ],
  bar: 'The Oak Bar opens daily at 4:00 pm except Monday.',
  studio: {
    name: 'Eros Digital Studio',
    note: 'Demonstration project. Ember & Oak is a fictional restaurant.',
  },
} as const;

export const nav = [
  { label: 'Menu', href: 'menu/' },
  { label: 'Wine', href: 'wine/' },
  { label: 'Philosophy', href: 'philosophy/' },
  { label: 'Our Story', href: 'our-story/' },
  { label: 'Private Dining', href: 'private-dining/' },
  { label: 'Contact', href: 'contact/' },
] as const;

/** Prefix an internal path with the configured base (works on GitHub Pages sub-paths). */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return `${base}/${clean}`;
}
