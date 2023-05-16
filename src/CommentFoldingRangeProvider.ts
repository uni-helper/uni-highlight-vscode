import type {
  CancellationToken,
  FoldingContext,
  FoldingRangeProvider,
  ProviderResult,
  TextDocument,
} from 'vscode'
import {
  FoldingRange,
  FoldingRangeKind,
} from 'vscode'

export class CommentFoldingRangeProvider implements FoldingRangeProvider {
  provideFoldingRanges(
    document: TextDocument,
    _context: FoldingContext,
    _token: CancellationToken,
  ): ProviderResult<FoldingRange[]> {
    const text = document.getText()
    const foldingRanges: FoldingRange[] = []
    const startLines = []
    const endLines = []
    const stack = []

    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line.includes('#ifdef')) {
        startLines.push(i + 1)
        stack.push(startLines.length - 1)
      }
      else if (line.includes('#endif')) {
        const index = stack.pop()
        if (index !== undefined)
          endLines[index] = i + 1
      }
    }

    for (let i = 0; i < endLines.length; i++) {
      foldingRanges.push(
        new FoldingRange(
          startLines[i] - 1,
          endLines[i] - 1,
          FoldingRangeKind.Region,
        ),
      )
    }

    return foldingRanges
  }
}
