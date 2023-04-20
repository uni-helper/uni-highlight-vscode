import type { TextEditor } from 'vscode'
import { DecorationRangeBehavior, Range, window } from 'vscode'
import type { PlatformInfo } from './getPlatformInfo'

const UnderlineDecoration = window.createTextEditorDecorationType({
  textDecoration: 'none; border-bottom: 1px dashed currentColor',
  color: '',
  cursor: 'pointer',
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

const NoneDecoration = window.createTextEditorDecorationType({
  cursor: 'text',
  textDecoration: 'none',
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

function colorDecoration(color: string) {
  return window.createTextEditorDecorationType({
    color,
    textDecoration: 'none',
    cursor: 'text',
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
  })
}

export function setPlatformColor(
  platformInfo: PlatformInfo,
  editor: TextEditor,
) {
  const start = editor.document.positionAt(platformInfo.start)
  const end = editor.document.positionAt(platformInfo.end)
  const editorRange = new Range(start, end)

  if (platformInfo.color) {
    // editor.setDecorations(NoneDecoration, [])
    editor.setDecorations(
      colorDecoration(platformInfo.color),
      [editorRange],
    )
  }
  else {
    // editor.setDecorations(NoneDecoration, [])
    editor.setDecorations(
      UnderlineDecoration,
      [editorRange],
    )
  }
}
