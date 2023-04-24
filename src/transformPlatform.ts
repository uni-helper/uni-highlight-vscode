import type { TextEditor } from 'vscode'
import { Range } from 'vscode'
import type { PlatformInfo } from './getPlatformInfo'

export function transformPlatform(platformInfos: PlatformInfo[], editor: TextEditor) {
  const highlightRange: HighlightRange = {
    prefix: [],
    platform: {},
    unPlatform: [],
  }
  platformInfos.forEach((platformInfo) => {
    const { start, end, row, color } = platformInfo
    const range = new Range(
      editor.document.positionAt(start),
      editor.document.positionAt(end),
    )
    if (platformInfo.type === 'prefix')
      highlightRange.prefix.push(range)

    if (platformInfo.type === 'platform') {
      if (!highlightRange.platform[color])
        highlightRange.platform[color] = []

      highlightRange.platform[color].push(range)
    }

    if (platformInfo.type === 'unPlatform') {
      highlightRange.unPlatform.push({
        range,
        row,
      })
    }
  })
  return highlightRange
}

export interface HighlightRange {
  prefix: Range[]
  platform: {
    [key: string]: Range[]
  }
  unPlatform: {
    range: Range
    row: string
  }[]
}
