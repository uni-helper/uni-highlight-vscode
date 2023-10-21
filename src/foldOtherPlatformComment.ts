import type { ExtensionContext } from 'vscode'
import { Position, Range, commands, window } from 'vscode'
import { CommentFoldingRangeProvider } from './CommentFoldingRangeProvider'

export async function foldOtherPlatformComment(
  _context: ExtensionContext,
  currentPlatform: string[],
) {
  const platform = await window.showQuickPick([
    'ALL',
    ...currentPlatform,
  ])

  if (!platform)
    return

  const editor = window.activeTextEditor
  const document = editor?.document

  if (document) {
    const c = new CommentFoldingRangeProvider()
    const ranges = c.provideFoldingRanges(document, undefined as any, undefined as any)
    if (Array.isArray(ranges)) {
      const comments = ranges.map((v) => {
        const text = document.getText(lineNumberToRange(v.start))
        return {
          start: v.start,
          flag: platform === 'ALL' ? false : !text?.includes(platform),
        }
      })
      const fold = comments.filter(v => v.flag).map(v => v.start)
      const unfold = comments.filter(v => !v.flag).map(v => v.start)
      await commands.executeCommand('editor.unfold', {
        levels: 1,
        direction: 'up',
        selectionLines: unfold,
      })
      await commands.executeCommand('editor.fold', {
        levels: 1,
        direction: 'up',
        selectionLines: fold,
      })
    }
  }

  function lineNumberToRange(line: number): Range {
    // Convert the line number to a position
    const startPosition = new Position(line, 0)
    const endPosition = new Position(line, Number.MAX_SAFE_INTEGER)

    // Create a range using the start and end positions
    const range = new Range(startPosition, endPosition)

    return range
  }
}
