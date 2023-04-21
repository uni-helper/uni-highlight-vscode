import type { TextEditor, TextEditorDecorationType } from 'vscode'
import { DecorationRangeBehavior, Range, window } from 'vscode'
import type { PlatformInfo } from './getPlatformInfo'
import { debounce } from './utils'

const UnderlineDecoration = window.createTextEditorDecorationType({
  textDecoration: 'none; border-bottom: 1px dashed currentColor',
  cursor: 'pointer',
  rangeBehavior: DecorationRangeBehavior.ClosedClosed,
})

function colorDecoration(color: string) {
  return window.createTextEditorDecorationType({
    color,
    rangeBehavior: DecorationRangeBehavior.ClosedClosed,
  })
}

export function setPlatformColor(
  platformInfo: PlatformInfo,
  editor: TextEditor,
) {
  let _colorDecoration: TextEditorDecorationType | undefined
  const start = editor.document.positionAt(platformInfo.start)
  const end = editor.document.positionAt(platformInfo.end)
  const editorRange = new Range(start, end)

  if (platformInfo.color) {
    const decoration = colorDecoration(platformInfo.color)

    editor.setDecorations(
      UnderlineDecoration,
      [],
    )
    if (platformInfo.type === 'platform') {
      _colorDecoration = decoration
      editor.setDecorations(
        _colorDecoration,
        [editorRange],
      )
    }
    else {
      editor.setDecorations(
        decoration,
        [editorRange],
      )
    }
  }
  else {
    if (_colorDecoration) {
      _colorDecoration.dispose()
      _colorDecoration = undefined
    }
    editor.setDecorations(
      UnderlineDecoration,
      [editorRange],
    )
  }

  window.onDidChangeTextEditorSelection(debounce(() => {
    if (_colorDecoration) {
      _colorDecoration.dispose()
      _colorDecoration = undefined
    }
  }, 500))
}
