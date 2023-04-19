import { window } from 'vscode'
import { getPlatformInfo } from './../src/getPlatformInfo'

export function getVscodeRange() {
  const editor = window.activeTextEditor
  if (!editor)
    return

  const code = editor.document.getText()
  const platformInfo = getPlatformInfo(code)

  return {
    platformInfo,
    editor,
  }
}
