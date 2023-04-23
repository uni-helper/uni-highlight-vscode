import type { TextEditor } from 'vscode'
import { DecorationRangeBehavior, window } from 'vscode'
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

function initDecorations(editor: TextEditor) {
  editor.setDecorations(UnderlineDecoration, [])
  editor.setDecorations(platformColorDecoration, [])
  editor.setDecorations(prefixColorDecoration, [])
}

export function setPlatformColor(
  highlightRange: HighlightRange,
  editor: TextEditor,
) {
  const { prefix, platform, unPlatform } = highlightRange

  initDecorations(editor)

  editor.setDecorations(
    prefixColorDecoration,
    prefix,
  )
  editor.setDecorations(
    platformColorDecoration,
    platform,
  )
  editor.setDecorations(
    UnderlineDecoration,
    unPlatform,
  )
}
