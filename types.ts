export type Language = 'en' | 'fa' | 'ps';
export type Theme = 'light' | 'dark';

export interface Translations {
  companyName: string;
  title: string;
  subtitle: string;
  cta: string;
  contact: string;
  whatsapp: string;
  rights: string;
  building: string;
  modal: {
    title: string;
    namePlaceholder: string;
    messagePlaceholder: string;
    send: string;
    cancel: string;
  };
}

export interface LanguageContent {
  en: Translations;
  fa: Translations;
  ps: Translations;
}