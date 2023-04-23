import { window } from 'vscode'
import { getPlatformInfo } from './../src/getPlatformInfo'
import { transformPlatform } from './transformPlatform'

export function getVscodeRange() {
  const editor = window.activeTextEditor
  if (!editor)
    return

  const code = editor.document.getText()
  const platformInfo = getPlatformInfo(code)
  const highlightRange = transformPlatform(platformInfo, editor)

  return {
    highlightRange,
    editor,
  }
}
