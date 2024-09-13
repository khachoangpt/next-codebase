export type StaticPageMeta = {
  title: string
  href: string
  isAuth: boolean
  pattern: string[]
}

type DynamicPageMeta = (config: object) => StaticPageMeta

export type PageMeta = StaticPageMeta | DynamicPageMeta

export const pageList = {
  login: {
    title: 'Login',
    href: '/login',
    isAuth: false,
    pattern: ['login'],
  },
  maintenance: {
    title: 'Maintenance',
    href: '/maintenance',
    isAuth: false,
    pattern: ['maintenance'],
  },
  home: {
    title: 'Home',
    href: '/',
    isAuth: false,
    pattern: [''],
  },
}

export const pathList: PageMeta[] = Object.values(pageList)
