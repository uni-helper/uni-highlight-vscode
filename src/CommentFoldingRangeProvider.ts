import type {
  FoldingRangeProvider,
  ProviderResult,
} from 'vscode'

import { FoldingRange, FoldingRangeKind } from 'vscode'
import { Ranges } from './getVscodeRange'

export class CommentFoldingRangeProvider implements FoldingRangeProvider {
  provideFoldingRanges(): ProviderResult<FoldingRange[]> {
    const { platformInfo } = Ranges
    if (!platformInfo.length)
      return []

    const foldingRanges: FoldingRange[] = []
    const startLines = []
    const endLines = []
    const stack = []

    for (let i = 0; i < platformInfo.length; i++) {
      const { row, type, line } = platformInfo[i] ?? {}
      if (type !== 'prefix')
        continue
      if (row === '#ifdef' || row === '#ifndef') {
        startLines.push(line - 1)
        stack.push(startLines.length - 1)
      }
      else if (row === '#endif') {
        const index = stack.pop()
        if (index !== undefined)
          endLines[index] = line - 1
      }
    }

    for (let i = 0; i < endLines.length; i++) {
      foldingRanges.push(
        new FoldingRange(
          startLines[i],
          endLines[i],
          FoldingRangeKind.Region,
        ),
      )
    }

    return foldingRanges
  }
}
