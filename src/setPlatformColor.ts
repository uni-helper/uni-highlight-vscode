import type { TextEditor } from 'vscode'
import { Range, window } from 'vscode'
import type { PlatformInfo } from './getPlatformInfo'

let oldEditorRange: Range
export function setPlatformColor(
  platformInfo: PlatformInfo,
  editor: TextEditor,
) {
  // 设置背景色前先清除上一次的背景色
  if (oldEditorRange) {
    editor.setDecorations(
      window.createTextEditorDecorationType({
        color: '',
      }),
      [oldEditorRange],
    )
  }

  const start = editor.document.positionAt(platformInfo.start)
  const end = editor.document.positionAt(platformInfo.end)
  const editorRange = new Range(start, end)
  oldEditorRange = editorRange
  // 设置背景色
  editor.setDecorations(
    window.createTextEditorDecorationType({
      color: platformInfo.color,
      rangeBehavior: 1,
      overviewRulerLane: 1,
    }),
    [editorRange],
  )
}
