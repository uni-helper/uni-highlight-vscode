import { commands, window } from 'vscode'
import type { TextDocument, TextEditor } from 'vscode'
import { getPlatformInfo } from './../src/getPlatformInfo'
import type { HighlightRange } from './transformPlatform'
import { transformPlatform } from './transformPlatform'
import { setPlatformColor } from './setPlatformColor'

export class Ranges {
  value!: HighlightRange
  editor!: TextEditor
  document!: TextDocument
  platformList!: string[]
  code!: string
  constructor() {
    this.getContext()
    this.getVscodeRange()
    this.hasPlatformList()
  }

  getContext() {
    const editor = window.activeTextEditor
    if (!editor)
      return
    this.editor = editor
    const document = editor?.document
    if (!document)
      return
    this.document = document
    this.code = document.getText()
  }

  getVscodeRange() {
    const platformInfo = getPlatformInfo(this.code)
    this.platformList = Array.from(new Set(platformInfo.filter(item => item.type === 'platform').map(item => item.row)))
    this.value = transformPlatform(platformInfo, this.editor)
  }

  hasPlatformList() {
    if (this.platformList.length)
      commands.executeCommand('setContext', 'uni.hasComment', true)
    else
      commands.executeCommand('setContext', 'uni.hasComment', false)
  }

  setColor() {
    setPlatformColor(this.value, this.editor)
  }
}
