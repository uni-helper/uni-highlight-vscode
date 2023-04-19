import type { TextEditor } from 'vscode'
import { Range, window } from 'vscode'

export function setPlatformColor(
  platformInfo: {
    start: number
    end: number
    color: string
  },
  editor: TextEditor,
) {
  const start = editor.document.positionAt(platformInfo.start)
  const end = editor.document.positionAt(platformInfo.end)
  const editorRange = new Range(start, end)
  // 设置背景色前先清除上一次的背景色
  editor.setDecorations(
    window.createTextEditorDecorationType({
      color: '',
    }),
    [editorRange],
  )
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
