import { cardURL, orignitePrimeURL, orundumURL } from './urls'

export const formatDate = (date: Date) => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

export const isDateDisabled = (date: number) => {
  return date < (new Date().setDate(new Date().getDate() - 1))
}

export function capitalize<T extends string>(str: T): Capitalize<T> {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}` as Capitalize<T>
}

export const resultHelper: {
  name: keyof AwardsType
  color: string
  alt: string
  img: string
}[] = [
  {
    name: 'orundum',
    color: 'red',
    alt: '合成玉',
    img: orundumURL,
  },
  {
    name: 'card',
    color: 'amber',
    alt: '寻访凭证',
    img: cardURL,
  },
  {
    name: 'orignitePrime',
    color: 'blue',
    alt: '至纯源石',
    img: orignitePrimeURL,
  },
]
