import type { TextEditor } from 'vscode'
import { DecorationRangeBehavior, Range, window } from 'vscode'
import { HIGHTLIGHT_COLOR } from './constants'
import type { HighlightRange } from './transformPlatform'

const UnderlineDecoration = window.createTextEditorDecorationType({
  textDecoration: 'none; border-bottom: 1px dashed currentColor',
  cursor: 'pointer',
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

const prefixColorDecoration = window.createTextEditorDecorationType({
  color: HIGHTLIGHT_COLOR.prefix,
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

const platformColorDecoration = window.createTextEditorDecorationType({
  color: HIGHTLIGHT_COLOR.platform['MP-WEIXIN'],
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

export function setPlatformColor(
  highlightRange: HighlightRange,
  editor: TextEditor,
) {
  let oldplatformRanges
  const { prefix, platform, unPlatform } = highlightRange

  if (prefix.length) {
    const prefixRanges = prefix.map((range) => {
      const start = editor.document.positionAt(range.start)
      const end = editor.document.positionAt(range.end)
      return new Range(start, end)
    })
    editor.setDecorations(
      prefixColorDecoration,
      prefixRanges,
    )
  }
  if (platform.length) {
    const platformRanges = platform.map((range) => {
      const start = editor.document.positionAt(range.start)
      const end = editor.document.positionAt(range.end)
      return new Range(start, end)
    })
    oldplatformRanges = platformRanges
    editor.setDecorations(
      UnderlineDecoration,
      [],
    )
    editor.setDecorations(
      platformColorDecoration,
      platformRanges,
    )
  }
  if (unPlatform.length) {
    const unPlatformRanges = unPlatform.map((range) => {
      const start = editor.document.positionAt(range.start)
      const end = editor.document.positionAt(range.end)
      return new Range(start, end)
    })
    editor.setDecorations(
      platformColorDecoration,
      [],
    )
    if (oldplatformRanges) {
      editor.setDecorations(
        platformColorDecoration,
        oldplatformRanges,
      )
    }
    editor.setDecorations(
      UnderlineDecoration,
      unPlatformRanges,
    )
  }
}
