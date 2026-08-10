export type DemoCategory = 'bug' | 'feature' | 'question';

export const DEMO_CATEGORIES: { value: DemoCategory; label: string }[] = [
  { value: 'bug', label: 'Chyba' },
  { value: 'feature', label: 'Návrh' },
  { value: 'question', label: 'Dotaz' },
];
