import { closest } from 'fastest-levenshtein'
import { PLATFORM_LIST } from '../constants/platform'

export function findClosestPlatform(target: string): string {
  const UpperTarget = target.toUpperCase()
  const exactMatchList = PLATFORM_LIST.filter(item => item.includes(UpperTarget))
  const targetList = exactMatchList.length === 0 ? PLATFORM_LIST : exactMatchList
  return closest(UpperTarget, targetList)
}
