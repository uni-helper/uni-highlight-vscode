import type { Platform } from './constants'
import { HIGHTLIGHT_COLOR, PLATFORM_LIST } from './constants'

export function getPlatformInfo(code: string) {
  const platformReg = new RegExp(`([^\n]*)(#ifdef|#ifndef|#endif)(( ${PLATFORM_LIST})( |$))?`, 'g')
  const platformResult = [...code.matchAll(platformReg)]

  const platformInfo = []
  for (let i = 0; i < platformResult.length; i++) {
    const item = platformResult[i]

    const index = item.index!
    const [self, _comment, prefix, platform] = item

    const platformPrefixStart = self.indexOf(prefix) + index
    const platformPrefixEnd = platformPrefixStart + prefix.length
    platformInfo.push({
      start: platformPrefixStart,
      end: platformPrefixEnd,
      color: HIGHTLIGHT_COLOR.prefix,
      type: prefix,
    })

    if (!(platform && platform.trim()))
      continue

    const color = HIGHTLIGHT_COLOR.platform[platform.trim() as Platform]
    const platformStart = self.indexOf(platform) + index
    const platformEnd = platformStart + platform.length
    platformInfo.push({
      start: platformStart,
      end: platformEnd,
      color,
      type: platform,
    })
  }
  return platformInfo
}

export type PlatformInfo = ReturnType<typeof getPlatformInfo>[number]
