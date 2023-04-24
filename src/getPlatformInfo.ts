import type { Platform } from './constants'
import { PLATFORM_LIST, HIGHTLIGHT_COLOR } from './constants'
import { parseComment } from './parseComment'

export function getPlatformInfo(code: string): PlatformInfo[] {
  const commentAST = parseComment(code)

  if (!commentAST)
    return []

  const platformInfos = []
  for (let i = 0; i < commentAST.length; i++) {
    const item = commentAST[i]
    const { start, end, type, row } = item
    const color = HIGHTLIGHT_COLOR.platform[row as Platform]

    if (type === 'prefix') {
      platformInfos.push({
        start,
        end,
        type,
      })
    }
    else if (type === 'platform' && color) {
      platformInfos.push({
        start,
        end,
        type,
        color,
      })
    }
    else if (type === 'platform' && !color) {
      platformInfos.push({
        start,
        end,
        type: 'unPlatform',
        row,
      })
    }
  }
  return platformInfos as unknown as PlatformInfo[]
}

export interface PlatformInfo {
  row: string
  start: number
  end: number
  type: 'prefix' | 'platform' | 'unPlatform'
  color: string
}
