import type { TextEditor } from 'vscode'
import { getPlatformInfo } from './../src/getPlatformInfo'
import { transformPlatform } from './transformPlatform'

export function getVscodeRange(editor: TextEditor) {
  const code = editor.document.getText()
  const platformInfo = getPlatformInfo(code)
  const highlightRange = transformPlatform(platformInfo, editor)

  return highlightRange
}
