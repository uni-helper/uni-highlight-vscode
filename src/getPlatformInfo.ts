import type { Platform } from './constants'
import { HIGHTLIGHT_COLOR, PLATFORM_LIST } from './constants'

export function getPlatformInfo(code: string) {
  const prefixReg = new RegExp(`([^\n]*)(#)([^\n]*)(ifdef|ifndef) (${PLATFORM_LIST})`, 'g')
  const prefixResult = [...code.matchAll(prefixReg)]

  const suffixReg = /([^\n]*)(#)([^\n]*)(endif)/g
  const suffixResult = [...code.matchAll(suffixReg)]

  const platformInfo = []
  for (let i = 0; i < prefixResult.length; i++) {
    const item = prefixResult[i]

    const index = item.index!
    const [self, comment, prefix, space, type, platform] = item

    const platformPrefixStart = self.indexOf(prefix) + index
    const platformPrefixEnd = self.indexOf(type) + type.length + index
    const platformStart = self.indexOf(platform) + index
    const platformEnd = platformStart + platform.length

    platformInfo.push({
      start: platformPrefixStart,
      end: platformPrefixEnd,
      color: HIGHTLIGHT_COLOR.prefix,
      type,
    })

    platformInfo.push({
      start: platformStart,
      end: platformEnd,
      color: HIGHTLIGHT_COLOR.platform[platform as Platform],
      type: platform,
    })
  }

  for (let i = 0; i < suffixResult.length; i++) {
    const item = suffixResult[i]

    const index = item.index!
    const [self, comment, prefix, space, type] = item

    const suffixPrefixStart = self.indexOf(prefix) + index
    const suffixPrefixEnd = self.indexOf(type) + type.length + index

    platformInfo.push({
      start: suffixPrefixStart,
      end: suffixPrefixEnd,
      color: HIGHTLIGHT_COLOR.prefix,
      type,
    })
  }
  return platformInfo
}
