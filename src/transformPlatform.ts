import type { PlatformInfo } from './getPlatformInfo'

export function transformPlatform(platformInfos: PlatformInfo[]) {
  const highlightRange: HighlightRange = {
    prefix: [],
    platform: [],
    unPlatform: [],
  }
  platformInfos.forEach((platformInfo) => {
    if (platformInfo.type === 'prefix') {
      highlightRange.prefix.push({
        start: platformInfo.start,
        end: platformInfo.end,
      })
    }
    else if (platformInfo.type === 'platform') {
      highlightRange.platform.push({
        start: platformInfo.start,
        end: platformInfo.end,
      })
    }
    else if (platformInfo.type === 'unPlatform') {
      highlightRange.unPlatform.push({
        start: platformInfo.start,
        end: platformInfo.end,
      })
    }
  })
  return highlightRange
}

interface Range {
  start: number
  end: number
}

export interface HighlightRange {
  prefix: Range[]
  platform: Range[]
  unPlatform: Range[]
}
