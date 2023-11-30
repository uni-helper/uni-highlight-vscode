import { closest } from 'fastest-levenshtein'
import { PLATFORM_LIST } from './../constants/platform'

export function debounce(func: Function, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: any[]) => {
    if (timeoutId)
      clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      func.apply(this, args)
      timeoutId = null
    }, delay)
  }
}

export const toString = (v: any) => Object.prototype.toString.call(v)
export const isObject = (val: any): val is object => toString(val) === '[object Object]'

export function findClosestPlatform(target: string): string {
  const UpperTarget = target.toUpperCase()
  const exactMatchList = PLATFORM_LIST.filter(item => item.includes(UpperTarget))
  const targetList = exactMatchList.length === 0 ? PLATFORM_LIST : exactMatchList
  return closest(UpperTarget, targetList)
}
