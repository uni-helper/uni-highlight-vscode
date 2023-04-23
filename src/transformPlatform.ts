import type { TextEditor } from 'vscode'
import { Range } from 'vscode'
import type { PlatformInfo } from './getPlatformInfo'

export function transformPlatform(platformInfos: PlatformInfo[], editor: TextEditor) {
  const highlightRange: HighlightRange = {
    prefix: [],
    platform: [],
    unPlatform: [],
  }
  platformInfos.forEach((platformInfo) => {
    const { start, end } = platformInfo
    const range = new Range(
      editor.document.positionAt(start),
      editor.document.positionAt(end),
    )
    highlightRange[platformInfo.type].push(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      platformInfo.type === 'unPlatform'
        ? {
            range,
            row: platformInfo.row,
          }
        : range,
    )
  })
  return highlightRange
}

export interface HighlightRange {
  prefix: Range[]
  platform: Range[]
  unPlatform: {
    range: Range
    row: string
  }[]
}
