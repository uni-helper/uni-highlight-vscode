import type { Platform } from './constants'
import { HIGHTLIGHT_COLOR } from './constants'
import { parseComment } from './parseComment'

export function getPlatformInfo(code: string) {
  const commentAST = parseComment(code)

  if (!commentAST)
    return []

  const platformInfo = []
  for (let i = 0; i < commentAST.length; i++) {
    const item = commentAST[i]
    const { start, end, type, row } = item

    if (type === 'prefix') {
      platformInfo.push({
        start,
        end,
        color: HIGHTLIGHT_COLOR.prefix,
      })
    }
    else if (type === 'platform') {
      const color = HIGHTLIGHT_COLOR.platform[row as Platform]
      platformInfo.push({
        start,
        end,
        color,
        type: 'platform',
      })
    }
  }
  return platformInfo
}

export type PlatformInfo = ReturnType<typeof getPlatformInfo>[number]
