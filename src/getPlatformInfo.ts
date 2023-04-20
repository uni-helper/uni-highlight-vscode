import type { Platform } from './constants'
import { HIGHTLIGHT_COLOR } from './constants'

export function getPlatformInfo(code: string) {
  const platformReg = /([^\n]*)(#ifdef|#ifndef|#endif)( [^\n]*)?/g
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

    const _platform = platform.trim() as Platform
    const color = HIGHTLIGHT_COLOR.platform[_platform]
    const platformStart = self.indexOf(_platform) + index
    const platformEnd = platformStart + _platform.length
    platformInfo.push({
      start: platformStart,
      end: platformEnd,
      color,
      type: _platform,
    })
  }
  return platformInfo
}

export type PlatformInfo = ReturnType<typeof getPlatformInfo>[number]
