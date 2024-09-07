export type LanguageSelect = {
  code: LOCALE
  name: string
}[]

export enum LOCALE {
  english = 'en',
  vietnamese = 'vi',
}

export const languages: LanguageSelect = [
  { code: LOCALE.english, name: 'English' },
  { code: LOCALE.vietnamese, name: 'Tiếng Việt' },
]

export const defaultLocale: LOCALE = LOCALE.english

export const locales: LOCALE[] = [LOCALE.english, LOCALE.vietnamese]
